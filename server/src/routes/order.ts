import { AddRequestToOrderController } from "@/controllers/Order/AddRequestToOrder";
import { ChangeOrderStatusController } from "@/controllers/Order/ChangeOrderStatus";
import { ChangeRequestStatusController } from "@/controllers/Order/ChangeRequestStatus";
import { MakeOrderController } from "@/controllers/Order/MakeOrder";
import { ShowOrderController } from "@/controllers/Order/Show";
import { authFunction } from "@/middlewares/auth";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

class OrderRoutes {
  async route(fastify: FastifyInstance) {
    fastify.get("/orders", async (req: FastifyRequest, rep: FastifyReply) => {
      const res = new ShowOrderController();

      return authFunction(req, rep, res, "Employee")
    })

    fastify.post("/orders/makeOrder", async (req: FastifyRequest, rep: FastifyReply) => {
      const res = new MakeOrderController();

      return authFunction(req, rep, res, "Employee")
    })

    fastify.patch("/orders/changeOrderStatus", async (req: FastifyRequest, rep: FastifyReply) => {
      const res = new ChangeOrderStatusController();

      return authFunction(req, rep, res, "Employee")
    })

    fastify.patch("/orders/changeRequestStatus/:id", async (req: FastifyRequest, rep: FastifyReply) => {
      const res = new ChangeRequestStatusController();

      return authFunction(req, rep, res, "Employee")
    })

    fastify.post("/orders/AddRequestToOrder", async (req: FastifyRequest, rep: FastifyReply) => {
      const res = new AddRequestToOrderController();

      return authFunction(req, rep, res, "Employee")
    })
  }
}



export { OrderRoutes };

