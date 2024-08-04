import ResponseData from '@/interface/ResponseData';
import { ShowOrdersService } from '@/services/Order/Show';
import { FastifyReply, FastifyRequest } from 'fastify';
class ShowOrderController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<ResponseData> {
    const orders = await new ShowOrdersService().execute();

    if (!orders) {
      return rep.code(204).send({ msg: "No orders were found" })
    }

    return {
      msg: orders.msg,
      statusCode: orders.statusCode,
      data: orders.data
    }
  }
}

export { ShowOrderController };

