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
import {
  fetchFetterInfoExcelConfigData,
  fetchHoyoPlayRequest,
} from "./services/system.service";

const PORT = process.env.PORT ?? 5000;

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

await Promise.all([fetchFetterInfoExcelConfigData(), fetchHoyoPlayRequest()]);

app.listen(PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
