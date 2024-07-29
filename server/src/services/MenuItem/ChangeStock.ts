import ChangeStockProps from "@/interface/MenuItem/ChangeStockProps";
import ResponseData from "@/interface/ResponseData";
import { PrismaClient } from "@prisma/client";

class ChangeStockService {
  async execute({ id }: ChangeStockProps): Promise<ResponseData> {

    const menuItem = new PrismaClient().menuItem

    try {
      const findItem = await menuItem.findFirst({
        select: {
          thereIsOnStock: true
        },
        where: {
          id
        }
      })


      if (findItem?.thereIsOnStock === true) {
        await menuItem.update({
          where: {
            id
          },
          data: {
            thereIsOnStock: false
          }
        })
      } else {
        await menuItem.update({
          where: {
            id
          },
          data: {
            thereIsOnStock: true
          }
        })
      }

      return {
        msg: "Stock changed successfully",
        statusCode: 200,
      };
    }

    catch (e) {
      return {
        msg: "This id doesn't exist",
        statusCode: 400,
        data: { e }
      };
    }

  }
}

export { ChangeStockService };
