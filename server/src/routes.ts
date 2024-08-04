import { FastifyInstance, FastifyPluginOptions } from "fastify";
import MenuItemRoutes from "./routes/menuItem";
import { OrderRoutes } from "./routes/order";
import UsersRoute from "./routes/users";

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  new MenuItemRoutes().route(fastify);
  new UsersRoute().route(fastify);
  new OrderRoutes().route(fastify);
}


export default routes;
