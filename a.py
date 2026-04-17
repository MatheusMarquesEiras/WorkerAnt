from datetime import datetime, timedelta, UTC
from typing import Optional
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from pydantic import BaseModel
from sqlalchemy import select

from app.infra.actions.login import Login
from app.infra.configs import DBConnector
from app.infra.entities import UsersTable

# Configurações de segurança
SECRET_KEY = "sua_chave_secreta_super_segura"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

# --- Modelos ---
class TokenData(BaseModel):
    username: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    user: str
    userUuid: str

# --- Helpers ---
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(UTC) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme)):
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

# --- Rotas ---

@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    # Usando a classe Login que você definiu em app/infra/actions/login.py
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

@app.get("/users/me", response_model=UserResponse)
async def read_users_me(current_user: UsersTable = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "user": current_user.user,
        "userUuid": str(current_user.userUuid)
    }

@app.get("/protegido")
async def rota_protegida(current_user: UsersTable = Depends(get_current_user)):
    return {"msg": f"Olá {current_user.user}, você acessou uma rota protegida!"}
