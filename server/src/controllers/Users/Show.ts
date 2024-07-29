import ResponseData from "@/interface/ResponseData";
import { ShowUsersService } from "@/services/Users/Show";
import { FastifyReply, FastifyRequest } from "fastify";

class ShowUsersController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<ResponseData> {
    const Users = await new ShowUsersService().execute();

    if (!Users) {
      return rep.code(204).send({ msg: "It doesn't exist any User", statusCode: 200 });
    }

    return rep.code(200).send(Users);
  }
}

export { ShowUsersController };

