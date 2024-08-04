import ChangePriceProps from '@/interface/MenuItem/ChangePriceProps';
import ResponseData from '@/interface/ResponseData';
import { ChangePriceService } from '@/services/MenuItem/ChangePrice';
import { FastifyReply, FastifyRequest } from 'fastify';

class ChangePriceController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<ResponseData> {
    const { id } = req.params as ChangePriceProps;
    const { price } = req.body as ChangePriceProps;

    if (id === null) return { msg: "You need to pass a valid id", statusCode: 401 }

    const changePrice = await new ChangePriceService().execute({ id, price });

    rep.code(changePrice.statusCode)

    return {
      msg: changePrice.msg,
      statusCode: changePrice.statusCode,
      data: changePrice.data
    }

  }
}

export { ChangePriceController };

