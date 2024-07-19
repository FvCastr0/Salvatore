import { CreateMenuItemController } from "@/controllers/MenuItem/Create";
import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { ShowMenuController } from "./controllers/MenuItem/ShowMenu";

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get("/menu", async (req: FastifyRequest, rep: FastifyReply) => {
    return new ShowMenuController().handle(req, rep);
  })

  fastify.post("/menu/create", async (req: FastifyRequest, rep: FastifyReply) => {
    return new CreateMenuItemController().handle(req, rep)
  })
}


export default routes;
