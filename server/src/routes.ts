import { CreateMenuItemController } from "@/controllers/MenuItem/Create";
import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post("/menu/create", async (req: FastifyRequest, rep: FastifyReply) => {
    return new CreateMenuItemController().handle(req, rep)
  })
}


export default routes;
