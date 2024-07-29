import ResponseData from "@/interface/ResponseData";
import ChangeUserRoleProps from "@/interface/Users/ChangeUserRoleProps";
import { ChangeUserRoleService } from "@/services/Users/ChangeRole";
import { FastifyReply, FastifyRequest } from "fastify";

class ChangeUserRoleController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<ResponseData> {
    const { id, role } = req.body as ChangeUserRoleProps

    const user = await new ChangeUserRoleService().execute({ id, role })

    return {
      msg: user.msg,
      statusCode: user.statusCode,
      data: user.data
    }
  }
}

export { ChangeUserRoleController };
