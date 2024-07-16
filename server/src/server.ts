import routes from '@/routes';
import cors from '@fastify/cors';
import Fastify from "fastify";

const app = Fastify({ logger: true });

const start = async () => {
  await app.register(cors);
  await app.register(routes);

  try {
    await app.listen({ port: 3000 })
  }
  catch (e) {
    process.exit();
  }
}


start();
