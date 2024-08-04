import MakeOrderProps from "@/interface/Orders/MakeOrderProps";
import ResponseData from "@/interface/ResponseData";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

class MakeOrderService {
  async execute({ requests, status }: MakeOrderProps): Promise<ResponseData> {
    try {
      const order = new PrismaClient().order;
      const menuItem = new PrismaClient().menuItem;

      const menuItems = await menuItem.findMany({
        where: { name: { in: requests } },
      });

      if (menuItems.length === requests.length) {
        const orderNumber = await order.count({ where: {} }) + 1;

        if (typeof orderNumber === 'number') {
          const orderId = nanoid();

          const date = new Date();

          await new PrismaClient().order.create({
            data: {
              id: orderId,
              orderNumber,
              status,
              date
            }
          })

          for (let i = 0; i < menuItems.length; i++) {
            await new PrismaClient().orderMenuItem.create({
              data: {
                menuItem: { connect: { id: menuItems[i].id } },
                order: { connect: { orderNumber: orderNumber } },
                status: "Waiting",
              },
            });
          }

          return {
            msg: "Order succefully created",
            statusCode: 200
          }
        } else {
          return {
            msg: "Order can't be created",
            statusCode: 400
          }
        }
      } else {
        return {
          msg: "Some item of your order doesn't exist",
          statusCode: 404
        }
      }

    }
    catch (e) {
      console.log(e);

      return {
        msg: "Internal server error",
        statusCode: 500
      }
    }
  }
}

export { MakeOrderService };

