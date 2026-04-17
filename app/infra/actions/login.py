from app.infra.configs import DBConnector
from app.infra.entities import UsersTable
from sqlalchemy import select
import bcrypt

class Login:
    def __init__(self, user: str, password: str):
        self.user = user
        self.password = password
        self.userUuid = None

    def login(self):
        with DBConnector() as db:
            user = db.session.execute(select(UsersTable).where(UsersTable.user == self.user)).scalar()
        
        if user is None:
            return False, None

        self.userUuid = user.userUuid
        
        if bcrypt.checkpw(self.password.encode('utf-8'), user.password.encode('utf-8')):
            return True, str(user.id)
        
        return False, None

    def get_uuid(self):
        return self.userUuid