import ChangeOrderStatusProps from "@/interface/Orders/ChangeOrderStatusProps";
import ResponseData from "@/interface/ResponseData";
import { ChangeOrderStatusService } from "@/services/Order/ChangeOrderStatus";
import { OrderStatus } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

class ChangeOrderStatusController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<ResponseData> {
    const { orderNumber, status } = req.body as ChangeOrderStatusProps

    if (
      status !== OrderStatus.Not_Met &&
      status !== OrderStatus.Order_Placed &&
      status !== OrderStatus.Order_Ready &&
      status !== OrderStatus.Paid &&
      status !== OrderStatus.Finished
    ) {
      rep.code(404)
      return {
        msg: "This status doesn't exist",
        statusCode: 404
      }
    }

    const order = await new ChangeOrderStatusService().execute({ orderNumber, status })

    rep.code(order.statusCode);
    return {
      msg: order.msg,
      statusCode: order.statusCode
    }
  }
}

export { ChangeOrderStatusController };
