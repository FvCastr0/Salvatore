import { CreateMenuItemController } from "@/controllers/MenuItem/Create";
import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { ChangeStockController } from "./controllers/MenuItem/ChangeStock";
import { DeleteMenuItemController } from "./controllers/MenuItem/Delete";
import { ShowMenuController } from "./controllers/MenuItem/ShowMenu";

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get("/menu", async (req: FastifyRequest, rep: FastifyReply) => {
    return new ShowMenuController().handle(req, rep);
  })

  fastify.post("/menu/create", async (req: FastifyRequest, rep: FastifyReply) => {
    return new CreateMenuItemController().handle(req, rep)
  })

  fastify.delete("/menu/delete/:id", async (req: FastifyRequest, rep: FastifyReply) => {
    return new DeleteMenuItemController().handle(req, rep)
  })

  fastify.patch("/menu/changeStock/:id", async (req: FastifyRequest, rep: FastifyReply) => {
    return new ChangeStockController().handle(req, rep)
  })
}


export default routes;
