from fastapi import FastAPI, File, Form, UploadFile
from fastapi.responses import JSONResponse
 
from fastapi.middleware.cors import CORSMiddleware
from users.userDTO import userDTO


app = FastAPI()
uDTO = userDTO()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # 실제 서비스 시에는 ["http://localhost:3000"] 처럼 제한하는게 좋습니다
    allow_credentials=True,
    allow_methods=["*"], # GET, POST, DELETE 등 모든 메서드 허용
    allow_headers=["*"], # 모든 헤더 허용
)


@app.get("/")
def get():
    return {"a": "b"}


# create
@app.post("/sign.up")
async def signUp(
    email: str = Form(),
    password: str = Form(),
    name: str = Form(),
    birthYear: str = Form(),
    birthMonth: str = Form(),
    birthDay: str = Form(),
    postcode: str = Form(),
    detailAddress: str = Form(),
    address: str = Form(),
    profileimage: UploadFile = File(),
):

    result = await uDTO.signUp(
        email,
        password,
        name,
        birthYear,
        birthMonth,
        birthDay,
        postcode,
        detailAddress,
        address,
        profileimage,
    )

    print("/sign.up", result)
    return JSONResponse(
        result,
        headers={
            "Access-Control-Allow-origin": "*",
            "Access-Control-Allow-credentials": "true",
        },
    )


# read
@app.post("/login.user")
def loginUser(email=Form(), password=Form()):
    result = uDTO.loginUser(email, password)
    print("/loginUser", result)
    return JSONResponse(
        result,
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
        },
    )


@app.post("/verifypassword")
def verifyPassword(email=Form(), password=Form()):
    result = uDTO.verifyPassword(email, password)
    return JSONResponse(
        result,
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
        },
    )


@app.post("/refreshToken")
def refreshToken(token=Form()):
    result = uDTO.refreshToken(token)
    return JSONResponse(
        result,
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
        },
    )



#update


#delete
@app.delete('/delete.user/{email}')
def deleteUser(email):
    print(email)
    result = uDTO.deleteUser(email)
    return JSONResponse(
        result,
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
        },
    )