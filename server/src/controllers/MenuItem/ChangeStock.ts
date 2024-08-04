import ChangeStockProps from '@/interface/MenuItem/ChangeStockProps';
import ResponseData from '@/interface/ResponseData';
import { ChangeStockService } from '@/services/MenuItem/ChangeStock';
import { FastifyReply, FastifyRequest } from 'fastify';

class ChangeStockController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<ResponseData> {
    const { id } = req.params as ChangeStockProps;

    if (id === null) return { msg: "You need to pass a valid id", statusCode: 401 }

    const changeStock = await new ChangeStockService().execute({ id });

    rep.code(changeStock.statusCode)
    return {
      msg: changeStock.msg,
      statusCode: changeStock.statusCode,
      data: changeStock.data
    }

  }
}

export { ChangeStockController };

