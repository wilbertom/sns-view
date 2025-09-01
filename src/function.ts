import awsLambdaFastify from "@fastify/aws-lambda";

import { server } from "./server.js";

export const proxy = awsLambdaFastify(server);
