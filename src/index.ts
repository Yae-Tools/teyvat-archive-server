import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";

import {
  characterRoutes,
  eventRoutes,
  materialRoutes,
  weaponRoutes,
} from "./routes";

const routes = [characterRoutes, materialRoutes, weaponRoutes, eventRoutes];

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
