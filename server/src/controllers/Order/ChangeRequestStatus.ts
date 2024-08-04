import ResponseData from "@/interface/ResponseData";
import { ChangeRequestStatusService } from "@/services/Order/ChangeRequestStatus";
import { OrderItemStatus } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

class ChangeRequestStatusController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<ResponseData> {
    const { status } = req.body as { status: OrderItemStatus }
    const { id } = req.params as { id: string }

    if (id.length < 24) {
      rep.code(404)
      return { msg: "This id doesn't exist", statusCode: 404 }
    }

    if (
      status !== OrderItemStatus.Waiting &&
      status !== OrderItemStatus.Cooking &&
      status !== OrderItemStatus.Ready &&
      status !== OrderItemStatus.Delivered &&
      status !== OrderItemStatus.Finished
    ) {
      rep.code(404)
      return {
        msg: "This status doesn't exist",
        statusCode: 404
      }
    }

    const order = await new ChangeRequestStatusService().execute({ id, status })

    rep.code(order.statusCode)
    return {
      msg: order.msg,
      statusCode: order.statusCode
    }
  }
}

export { ChangeRequestStatusController };
