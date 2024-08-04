import ResponseData from "@/interface/ResponseData";
import { OrderItemStatus, PrismaClient } from "@prisma/client";

class ChangeRequestStatusService {
  async execute({ id, status }: { id: string, status: OrderItemStatus }): Promise<ResponseData> {
    try {

      const request = await new PrismaClient()
        .orderMenuItem.update({
          where: { id },
          data: { status }
        })

      if (request !== null) {
        return {
          msg: "Status succefully changed",
          statusCode: 200
        }
      } else {
        return {
          msg: "This id doesn't exist",
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

export { ChangeRequestStatusService };
