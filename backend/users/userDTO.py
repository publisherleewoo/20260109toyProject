from datetime import datetime, timedelta, timezone
from os import remove
from uuid import uuid4
import jwt
from oracledb import connect


class userDTO:
    def __init__(self):
        pass

    async def signUp(
        self,
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
    ):
        try:
            binaryCode = await profileimage.read()
            filename = profileimage.filename
            type = filename[-4:]
            filename = filename.replace(type, "") + "_" + str(uuid4()) + type
            f = open("./users/images/" + filename, "wb")
            f.write(binaryCode)
            f.close()

            try:
                con = connect("leewoo/3214@195.168.9.198:1521/xe")
                cur = con.cursor()
                birth = datetime(int(birthYear), int(birthMonth), int(birthDay))
                sql = "INSERT INTO des2user VALUES (:1, :2, :3, TO_DATE(:4, 'YYYY-MM-DD'), :5, :6, :7, :8)"
                cur.execute(
                    sql,
                    (
                        email,
                        password,
                        name,
                        birth,
                        postcode,
                        address,
                        detailAddress,
                        filename,
                    ),
                )

                if cur.rowcount == 1:
                    con.commit()
                    return {"msg": "signUp DB 등록 성공"}
            except Exception as e:
                print(e)
                remove("./users/images/" + filename)
                return {"msg": "signUp DB 등록 실패"}

            finally:
                cur.close()
                con.close()

        except Exception as e:
            print(e)
            return {"msg": "이미지 등록 실패"}

        pass

    def loginUser(self, email, password):
        try:
            con = connect("leewoo/3214@195.168.9.198:1521/xe")
            cur = con.cursor()
            sql = "select * from des2user where email=:1 AND password=:2"
            cur.execute(sql, (email, password))
            row = cur.fetchone()

            if row:
                (
                    email,
                    password,
                    name,
                    bith,
                    postCode,
                    address,
                    detailAddress,
                    profileImage,
                ) = row
                print(row)
                bith = datetime.strftime(bith, "%Y-%m-%d")
                userInfo = {
                    "email": email,
                    "name": name,
                    "bith": bith,
                    "postCode": postCode,
                    "address": address,
                    "detailAddress": detailAddress,
                    "profileImage": profileImage,
                    "exp": datetime.now(timezone.utc) + timedelta(seconds=300),
                }
                try:
                    token = jwt.encode(userInfo, "1234", "HS256")
                    del userInfo["exp"]
                    return {
                        "msg": "로그인 성공",
                        "user": userInfo,
                        "token": token,
                    }
                except Exception as e:
                    print(e)
                    return {"msg": "로그인 토큰 생성 실패"}

            else:
                return {"msg": "일치하는 사용자가 없습니다"}

        except Exception as e:
            print(e)
            return {"msg": "일치하는 아이디나 비밀번호가 없습니다"}

        finally:
            cur.close()
            con.close()

    def refreshToken(self, token):
        try:
            payload = jwt.decode(token, "1234", "HS256")
            new_token = jwt.encode(payload, "1234", "HS256")
            return {
                "msg": "토큰이 아직 유효합니다",
                "user": payload,
                "token": new_token,
            }
        except jwt.ExpiredSignatureError:
            # 만료된 토큰
            return {"msg": "토큰이 만료 되었습니다"}
        except jwt.InvalidTokenError:
            return {"msg": "유효하지 않은 토큰입니다"}
        except Exception as e:
            print(e)
            return {"msg": "알 수 없는 오류가 발생했습니다"}

    def verifyPassword(self, email, password):
        try:
            con = connect("leewoo/3214@195.168.9.198:1521/xe")
            cur = con.cursor()
            sql = "select * from des2user where email=:1 and password=:2"
            cur.execute(sql, (email, password))
            row = cur.fetchone()
            if row:
                return {"msg": "인증에 성공했습니다"}
            return {"msg": "비밀번호가 틀렸습니다"}
        except Exception as e:
            print(e)
            return {"msg": "verifyPassword DB Error"}
        finally:
            cur.close()
            con.close()

    def deleteUser(self,email):
        try:
            con = connect("leewoo/3214@195.168.9.198:1521/xe")
            cur = con.cursor()
            sql = "delete * from des2user where email=:1"
            cur.execute(sql, (email))
            row = cur.fetchone()
            if row:
                return {"msg": "삭제에 성공했습니다"}
            return {"msg": "아이디가 없습니다"}
        except Exception as e:
            print(e)
            return {"msg": "deleteUser DB Error"}
        finally:
            cur.close()
            con.close()

