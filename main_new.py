import os
import uuid
from datetime import datetime, timedelta, UTC
from typing import Optional, List

from fastapi import FastAPI, APIRouter, Depends, HTTPException, status, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from pydantic import BaseModel
from sqlalchemy import select

from app.infra.actions import Login, Register, RegisterFile, get_user_files, get_file_path_and_name
from app.infra.configs import DBConnector
from app.infra.entities import UsersTable

# --- Settings ---
SECRET_KEY = "sua_chave_secreta_super_segura"  # TODO: mover para variável de ambiente
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
UPLOAD_FOLDER = "uploads"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Models ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    user: str
    userUuid: str

class FileItem(BaseModel):
    file_name: str
    fileUuid: str

# --- Helpers ---
def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(UTC) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme)) -> UsersTable:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar as credenciais",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception

    with DBConnector() as db:
        user = db.session.execute(
            select(UsersTable).where(UsersTable.user == token_data.username)
        ).scalar()

    if user is None:
        raise credentials_exception

    return user

# --- Auth router ---
auth_router = APIRouter(prefix="/auth", tags=["auth"])

@auth_router.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    auth = Login(user=form_data.username, password=form_data.password)
    success, user_id = auth.login()

    if not success:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": form_data.username})
    return {"access_token": access_token, "token_type": "bearer"}

@auth_router.post("/register", response_model=Token)
async def register(form_data: OAuth2PasswordRequestForm = Depends()):
    user_uuid = uuid.uuid4()
    register_action = Register(
        userUuid=user_uuid,
        user=form_data.username,
        password=form_data.password,
        upload_folder=UPLOAD_FOLDER,
    )

    if not register_action.register():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Usuário já existe",
        )

    access_token = create_access_token(data={"sub": form_data.username})
    return {"access_token": access_token, "token_type": "bearer"}

@auth_router.post("/logout")
async def logout(current_user: UsersTable = Depends(get_current_user)):
    # JWT é stateless; o cliente descarta o token localmente
    return {"message": "Logout realizado com sucesso"}

# --- Services router ---
services_router = APIRouter(prefix="/services", tags=["services"])

@services_router.post("/upload")
async def upload(
    files: List[UploadFile] = File(...),
    current_user: UsersTable = Depends(get_current_user),
):
    if not files:
        raise HTTPException(status_code=400, detail="Nenhum arquivo selecionado")

    user_upload_dir = os.path.join(UPLOAD_FOLDER, str(current_user.userUuid))
    os.makedirs(user_upload_dir, exist_ok=True)

    for file in files:
        file_name, file_extension = os.path.splitext(file.filename)
        file_uuid = uuid.uuid4()

        dest_path = os.path.join(user_upload_dir, str(file_uuid) + file_extension)
        with open(dest_path, "wb") as f:
            f.write(await file.read())

        RegisterFile(
            filename=file_name,
            fileUuid=file_uuid,
            fileExtension=file_extension,
            userUuid=str(current_user.userUuid),
        ).register()

    return {"success": True}

@services_router.get("/download/{file_uuid}")
async def download(
    file_uuid: str,
    current_user: UsersTable = Depends(get_current_user),
):
    path, name = get_file_path_and_name(file_uuid=file_uuid)
    return FileResponse(path, filename=name, media_type="application/octet-stream")

# --- Users router ---
users_router = APIRouter(prefix="/users", tags=["users"])

@users_router.get("/me", response_model=UserResponse)
async def read_users_me(current_user: UsersTable = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "user": current_user.user,
        "userUuid": str(current_user.userUuid),
    }

@users_router.get("/files", response_model=List[FileItem])
async def list_user_files(current_user: UsersTable = Depends(get_current_user)):
    files = get_user_files(str(current_user.userUuid))
    return [{"file_name": f.file_name, "fileUuid": str(f.fileUuid)} for f in files]

# --- Register routers ---
app.include_router(auth_router)
app.include_router(services_router)
app.include_router(users_router)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='localhost', port=3333)
