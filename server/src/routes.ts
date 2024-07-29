import { FastifyInstance, FastifyPluginOptions } from "fastify";
import MenuItemRoutes from "./routes/menuItem";
import UsersRoute from "./routes/users";

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  new MenuItemRoutes().route(fastify);
  new UsersRoute().route(fastify);
}


export default routes;
