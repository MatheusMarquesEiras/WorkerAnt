from app.infra.configs import DBConnector
from app.infra.entities import FilesTable
from uuid import UUID

def get_file_path_and_name(file_uuid: str):
    with DBConnector() as db:
        uuid_obj = UUID(str(file_uuid))
        path, name, ftype = db.session.query(FilesTable.file_path, FilesTable.file_name, FilesTable.file_type).filter(FilesTable.fileUuid == uuid_obj).first()

    return path, name + ftype
