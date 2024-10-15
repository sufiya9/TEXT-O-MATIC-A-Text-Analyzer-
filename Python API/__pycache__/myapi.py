# create first api
from fastapi import FastAPI

app = FastAPI()

# localhost/delete-user (delete-user is end point for this url ) and this is called path

# amozon.com/create-User
# GET- get, return or show  an information 
# POST- create somthing new
# PUT- Update
# DELETE- delete something 

@app.get("/")  # / is represented home page
def index():
    return{"name": "first data"}
