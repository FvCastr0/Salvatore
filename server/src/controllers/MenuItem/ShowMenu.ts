import ResponseData from "@/interface/ResponseData";
import { ShowMenuService } from "@/services/MenuItem/ShowMenu";
import { FastifyReply, FastifyRequest } from "fastify";

class ShowMenuController {
  async handle(req: FastifyRequest, rep: FastifyReply): Promise<ResponseData> {
    const menuItems = await new ShowMenuService().execute();

    if (!menuItems) {
      return rep.code(204).send({ msg: "No menu items found", statusCode: 200 });
    }

    return rep.code(200).send(menuItems);
  }
}

export { ShowMenuController };
