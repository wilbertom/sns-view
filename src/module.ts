import type { FastifyPluginAsync } from "fastify";

export interface Module {
  web: FastifyPluginAsync;
}
