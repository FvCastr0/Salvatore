import ChangeOrderStatusProps from '@/interface/Orders/ChangeOrderStatusProps';
import ResponseData from '@/interface/ResponseData';
import { PrismaClient } from '@prisma/client';

class ChangeOrderStatusService {
  async execute({ orderNumber, status }: ChangeOrderStatusProps): Promise<ResponseData> {
    try {
      const order = new PrismaClient().order;

      const changeOrder = await order.update({
        where: {
          orderNumber
        },
        data: {
          status
        }
      })

      if (changeOrder !== null) {
        return {
          msg: "Order status changed to: " + status,
          statusCode: 200
        }
      } else {
        return {
          msg: "This order doesn't exist",
          statusCode: 404
        }
      }
    }
    catch (e) {
      return {
        msg: "Internal server error",
        statusCode: 500
      }
    }
  }
}

export { ChangeOrderStatusService };
