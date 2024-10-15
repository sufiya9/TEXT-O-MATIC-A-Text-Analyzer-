# import fastapi
from fastapi import FastAPI, Form, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import summarization as smz
import os
app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def save_file(file, path):
    print(os.getcwd())
    with open(os.path.join(path, file.filename), "wb") as buffer:
        buffer.write(file.file.read())


# Create a route
@app.get("/")
def index():
    return {"data": {"api": "textomatic api", "version": "0.1", "author": "Sufiya ansari"}}

# Create a route that excepts files from form
@app.post("/files/")
async def create_file(file: bytes = File(...)):
    return {"file_size": len(file)}

# Create a route that excepts files from form
@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    save_file(file, path="../uploads")
    return {"filename": file.filename, 'status': 'success'}

# Create a route that excepts music files
@app.post("/uploadmusicfile/")
async def create_upload_music(file: UploadFile = File(...)):
    save_file(file, path="../uploads/music")
    return {"filename": file.filename, 'status': 'success'}

# create a api route that summarizes the text str 
@app.post("/textomatic/api/v1/summarize/text")
async def summarize_text(text: str = Form(...)):
    file = open("../uploads/text.txt", "w")
    file.write(text)
    file.close()
    summary = smz.generate_summary('../uploads/text.txt',2)
    return {'summary': summary,
            'summary_length': len(summary),
            'status': 'success'}

# create an api route that summarizes the file after getting text from the file
@app.post("/textomatic/api/v1/summarize")
async def summarize(file: UploadFile = File(...)):
    save_file(file, path="../uploads")
    summary = smz.generate_summary('../uploads/'+file.filename,2)
    return {'summary': summary,
            'summary_length': len(summary),
            'status': 'success'}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)