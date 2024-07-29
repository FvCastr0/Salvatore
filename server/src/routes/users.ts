import { ChangeUserRoleController } from "@/controllers/Users/ChangeRole";
import { CreateUserController } from "@/controllers/Users/Create";
import { DeleteUserController } from "@/controllers/Users/Delete";
import { LoginUserController } from "@/controllers/Users/Login";
import { ShowUsersController } from "@/controllers/Users/Show";
import { authFunction } from "@/middlewares/auth";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

class UsersRoute {
  async route(fastify: FastifyInstance) {
    fastify.get("/users", async (req: FastifyRequest, rep: FastifyReply) => {
      const res = new ShowUsersController();

      return authFunction(req, rep, res, "Manager")
    })

    fastify.post("/users/create", async (req: FastifyRequest, rep: FastifyReply) => {
      const res = new CreateUserController()

      return authFunction(req, rep, res, "Manager");
    })

    fastify.post("/users/login", async (req: FastifyRequest, rep: FastifyReply) => {
      return new LoginUserController().handle(req, rep);
    })

    fastify.patch("/users/changeUserRole", async (req: FastifyRequest, rep: FastifyReply) => {
      const res = new ChangeUserRoleController();

      return authFunction(req, rep, res, "Manager")
    })

    fastify.delete("/users/deleteUser/:id", async (req: FastifyRequest, rep: FastifyReply) => {
      const res = new DeleteUserController();

      return authFunction(req, rep, res, "Manager")
    })
  }
}



export default UsersRoute;
