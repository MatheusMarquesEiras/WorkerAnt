from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.get("/item/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='localhost', port=3333)