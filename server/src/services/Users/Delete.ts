import DeletItemProp from "@/interface/DeleteItemProp";
import ResponseData from "@/interface/ResponseData";
import { PrismaClient } from "@prisma/client";

class DeleteUserService {
  async execute({ id }: DeletItemProp): Promise<ResponseData> {

    const user = new PrismaClient().users;

    try {
      const verifyIfIdExist = await user.findFirst({
        where: {
          id
        }
      })

      if (verifyIfIdExist !== null) {
        await user.delete({
          where: {
            id
          }
        })

        return {
          msg: "User deleted successfully",
          statusCode: 200
        }
      } else {
        return {
          msg: "This User doesn't exist",
          statusCode: 404
        }
      }
    }
    catch (e) {
      return {
        msg: "Internal server error",
        statusCode: 500,
        data: { error: e }
      }
    }
  }

}

export { DeleteUserService };

