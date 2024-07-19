import DeletItemProp from "@/interface/DeleteItemProp";
import ResponseData from "@/interface/ResponseData";
import { PrismaClient } from "@prisma/client";

class DeleteMenuItemService {
  async execute({ id }: DeletItemProp): Promise<ResponseData> {

    const menu = new PrismaClient().menuItem;

    try {
      const verifyIfIdExist = await menu.findFirst({
        where: {
          id
        }
      })

      if (verifyIfIdExist !== null) {
        await menu.delete({
          where: {
            id
          }
        })

        return {
          msg: "Item deleted successfully",
          statusCode: 200
        }
      } else {
        return {
          msg: "This item doesn't exist",
          statusCode: 404
        }
      }
    }
    catch (e) {
      return {
        msg: "Internal server error",
        statusCode: 200,
        data: { error: e }
      }
    }
  }

}

export { DeleteMenuItemService };
