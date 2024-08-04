import MakeOrderProps from '@/interface/Orders/MakeOrderProps';
import ResponseData from '@/interface/ResponseData';
import { MakeOrderService } from '@/services/Order/MakeOrder';
import { FastifyReply, FastifyRequest } from 'fastify';

class MakeOrderController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<ResponseData> {
    const { requests, status = 'Not_Met' } = req.body as MakeOrderProps

    if (requests == undefined) {
      return {
        msg: "Some fields are incorrect",
        statusCode: 404
      }
    } else {
      const orders = await new MakeOrderService().execute({ requests, status });
      rep.code(orders.statusCode)
      return {
        msg: orders.msg,
        statusCode: orders.statusCode,
        data: orders.data
      }

    }
  }
}

export { MakeOrderController };

