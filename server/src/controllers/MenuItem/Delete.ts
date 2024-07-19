import DeletItemProp from '@/interface/DeleteItemProp';
import ResponseData from '@/interface/ResponseData';
import { DeleteMenuItemService } from '@/services/MenuItem/Delete';
import { FastifyReply, FastifyRequest } from 'fastify';

class DeleteMenuItemController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<ResponseData> {
    const { id } = req.params as DeletItemProp;

    if (id === null) return { msg: "You need to pass a valid id", statusCode: 401 }

    const deleteItem = await new DeleteMenuItemService().execute({ id });

    return {
      msg: deleteItem.msg,
      statusCode: deleteItem.statusCode
    }

  }
}

export { DeleteMenuItemController };
