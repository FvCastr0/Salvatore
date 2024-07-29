import routes from '@/routes';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import Fastify from "fastify";
import fp from 'fastify-plugin';

const app = Fastify({ logger: true });

const start = async () => {
  const secret = String(process.env.SECRET)
  await app.register(cors);
  await app.register(routes);
  await app.register(fp(async (fastify) => {
    fastify.register(jwt, {
      secret
    });
  }));


  try {
    await app.listen({ port: 3000 })
  }
  catch (e) {
    process.exit();
  }
}


start();
