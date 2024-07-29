import ResponseData from "@/interface/ResponseData";
import LoginUserProps from "@/interface/Users/LoginUserProps";
import { PrismaClient } from "@prisma/client";
import { compareSync } from "bcrypt-ts";
import { sign } from 'jsonwebtoken';

class LoginUserService {
  async execute({ name, password }: LoginUserProps): Promise<ResponseData> {
    try {
      const user = await new PrismaClient()
        .users.findFirst({
          where: {
            name
          },
          select: {
            name: true,
            password: true,
            id: true,
            role: true
          }
        })


      if (user !== null) {
        const hashedPass = compareSync(password, user.password)
        if (hashedPass) {
          if (typeof process.env.SECRET === "string") {
            const token = sign(user, process.env.SECRET)
            return { msg: 'Succefully logged in', statusCode: 200, data: token }
          }
          return {
            msg: "Internal server error",
            statusCode: 500
          }
        } else {
          return {
            msg: "The password is wrong",
            statusCode: 400
          }
        }

      } else {
        return {
          msg: "User doesn't exist",
          statusCode: 400
        }
      }
    } catch (e) {
      console.log(e);

      return { msg: "Internal server error!", statusCode: 500, data: { err: e } };
    }
  }

}

export { LoginUserService };

