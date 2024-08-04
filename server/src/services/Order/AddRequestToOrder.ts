import AddRequestToOrderProps from "@/interface/Orders/AddRequestToOrderProps";
import ResponseData from "@/interface/ResponseData";
import { PrismaClient } from "@prisma/client";

class AddRequestToOrderService {
  async execute({ id, requests }: AddRequestToOrderProps): Promise<ResponseData> {
    const menuItems = await new PrismaClient().menuItem.findMany({
      where: { name: { in: requests } },
    });

    if (menuItems.length === requests.length) {
      const order = await new PrismaClient()
        .order.findUnique({
          where: { id },
        })
      if (order !== null) {
        for (let i = 0; i < menuItems.length; i++) {
          await new PrismaClient().orderMenuItem.create({
            data: {
              menuItem: { connect: { id: menuItems[i].id } },
              order: { connect: { id } },
              status: "Waiting",
            },
          });
        }

        return {
          msg: "Request succefully added",
          statusCode: 200
        }
      } else {
        return {
          msg: "This order doesn't exist",
          statusCode: 400
        }
      }

    } else {
      return {
        msg: "One of your request is invalid",
        statusCode: 400
      }
    }
  }
}

export { AddRequestToOrderService };

