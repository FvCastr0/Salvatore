import ResponseData from "@/interface/ResponseData";
import { PrismaClient } from "@prisma/client";

class ShowOrdersService {
  async execute(): Promise<ResponseData> {
    try {
      const orders = new PrismaClient().order;

      const data = await orders.findMany({
        select: {
          items: true,
          orderNumber: true,
          status: true
        }
      });

      return {
        msg: "Orders loaded",
        statusCode: 200,
        data
      }
    }
    catch (e) {
      return {
        msg: "Internal server error!",
        statusCode: 500
      }
    }
  }
}

export { ShowOrdersService };
