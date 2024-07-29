import { CreateMenuItemController } from "@/controllers/MenuItem/Create";
import { authFunction } from "@/middlewares/auth";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ChangePriceController } from "../controllers/MenuItem/ChangePrice";
import { ChangeStockController } from "../controllers/MenuItem/ChangeStock";
import { DeleteMenuItemController } from "../controllers/MenuItem/Delete";
import { ShowMenuController } from "../controllers/MenuItem/ShowMenu";

class MenuItemRoutes {
  async route(fastify: FastifyInstance) {
    fastify.get("/menu", async (req: FastifyRequest, rep: FastifyReply) => {
      const response = new ShowMenuController();

      return await authFunction(req, rep, response, "Attendant")
    })

    fastify.post("/menu/create", async (req: FastifyRequest, rep: FastifyReply) => {
      const response = new CreateMenuItemController()

      return await authFunction(req, rep, response, "Attendant")
    })

    fastify.delete("/menu/delete/:id", async (req: FastifyRequest, rep: FastifyReply) => {
      const response = new DeleteMenuItemController()

      return authFunction(req, rep, response, "Manager")

    })

    fastify.patch("/menu/changeStock/:id", async (req: FastifyRequest, rep: FastifyReply) => {
      const response = new ChangeStockController()

      return authFunction(req, rep, response, "Manager")
    })

    fastify.patch("/menu/changePrice/:id", async (req: FastifyRequest, rep: FastifyReply) => {
      const response = new ChangePriceController()

      return authFunction(req, rep, response, "Manager")
    })
  }
}



export default MenuItemRoutes;
