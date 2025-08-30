import Fastify from "fastify";

import { modules } from "./modules";

const server = Fastify({
  logger: true,
});

for (const module of modules) {
  server.register(module.web);
}

const start = async () => {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
