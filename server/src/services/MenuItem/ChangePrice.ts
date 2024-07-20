import ChangePriceProps from "@/interface/ChangePriceProps";
import ResponseData from "@/interface/ResponseData";
import { PrismaClient } from "@prisma/client";

class ChangePriceService {
  async execute({ id, price }: ChangePriceProps): Promise<ResponseData> {

    const menuItem = new PrismaClient().menuItem

    try {
      const findItem = await menuItem.findFirst({
        where: {
          id
        }
      })

      if (findItem !== null) {
        await menuItem.update({
          where: {
            id
          },
          data: {
            price
          }
        })
      }

      return {
        msg: "Price changed successfully",
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

export { ChangePriceService };

