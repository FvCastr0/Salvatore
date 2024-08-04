import DeletItemProp from '@/interface/DeleteItemProp';
import ResponseData from '@/interface/ResponseData';
import { DeleteUserService } from '@/services/Users/Delete';
import { FastifyReply, FastifyRequest } from 'fastify';

class DeleteUserController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<ResponseData> {
    const { id } = req.params as DeletItemProp;

    if (id === null) return { msg: "You need to pass a valid id", statusCode: 401 }

    const deleteUser = await new DeleteUserService().execute({ id });

    rep.code(deleteUser.statusCode)
    return {
      msg: deleteUser.msg,
      statusCode: deleteUser.statusCode
    }

  }
}

export { DeleteUserController };

