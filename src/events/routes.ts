import type { Module } from "../module";

async function web(server, options) {
  server.get("/", async () => {
    return { hello: "world!" };
  });
}

export const events: Module = {
  web,
};
