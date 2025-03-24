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
import { fetchFetterInfoExcelConfigData } from "./services/system.service";

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
  }),
);

routes.forEach(async (route) => {
  await route(app);
});

fetchFetterInfoExcelConfigData();
app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
