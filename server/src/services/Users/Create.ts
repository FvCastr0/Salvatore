import ResponseData from "@/interface/ResponseData";
import CreateUserProp from "@/interface/Users/CreateUserProps";
import { PrismaClient } from "@prisma/client";

class CreateUserService {
  async execute({ name, password, role }: CreateUserProp): Promise<ResponseData> {
    try {
      const user = new PrismaClient().users;

      const verifyIfUserExist = await user.findUnique({
        where: { name },
        select: { name: true }
      });

      if (verifyIfUserExist === null) {
        await user.create({
          data: {
            name,
            password,
            role
          }
        })
        return {
          msg: `User with role '${role}' was hired`,
          statusCode: 201,
        }

      } else {
        return {
          msg: 'This User already exist!',
          statusCode: 400,
        }
      }

    } catch (e) {
      return {
        msg: `Internal server error`,
        statusCode: 500,
        data: { e }
      }
    }

  }
}


export { CreateUserService };

