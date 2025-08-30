import type { FastifyPluginAsync } from "fastify";
import type { Module } from "../module.js";

const web: FastifyPluginAsync = async (server, options) => {
  server.get("/", async () => {
    return { hello: "world!" };
  });
};

export const events: Module = {
  web,
};
