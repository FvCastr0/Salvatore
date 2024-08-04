import AddRequestToOrderProps from "@/interface/Orders/AddRequestToOrderProps";
import ResponseData from "@/interface/ResponseData";
import { AddRequestToOrderService } from "@/services/Order/AddRequestToOrder";
import { FastifyReply, FastifyRequest } from "fastify";

class AddRequestToOrderController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<ResponseData> {
    const { id, requests } = req.body as AddRequestToOrderProps

    const request = await new AddRequestToOrderService().execute({ id, requests })

    rep.code(request.statusCode)
    return {
      msg: request.msg,
      statusCode: request.statusCode
    }
  }
}

export { AddRequestToOrderController };
