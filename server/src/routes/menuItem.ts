import { CreateMenuItemController } from "@/controllers/MenuItem/Create";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ChangePriceController } from "../controllers/MenuItem/ChangePrice";
import { ChangeStockController } from "../controllers/MenuItem/ChangeStock";
import { DeleteMenuItemController } from "../controllers/MenuItem/Delete";
import { ShowMenuController } from "../controllers/MenuItem/ShowMenu";

class MenuItemRoutes {
  async route(fastify: FastifyInstance) {
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

    fastify.patch("/menu/changePrice/:id", async (req: FastifyRequest, rep: FastifyReply) => {
      return new ChangePriceController().handle(req, rep)
    })
  }
}



export default MenuItemRoutes;
