import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";

import {
  artifactRoutes,
  characterRoutes,
  eventRoutes,
  materialRoutes,
  systemRoutes,
  weaponRoutes,
} from "./routes";

const routes = [
  characterRoutes,
  materialRoutes,
  weaponRoutes,
  eventRoutes,
  artifactRoutes,
  systemRoutes,
];

const app = new Elysia();

app.use(
  cors({
    allowedHeaders: ["Content-Type"],
  })
);

routes.forEach(async (route) => {
  await route(app);
});

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
