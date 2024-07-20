import { FastifyInstance, FastifyPluginOptions } from "fastify";
import MenuItemRoutes from "./routes/menuItem";

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  new MenuItemRoutes().route(fastify)
}


export default routes;
