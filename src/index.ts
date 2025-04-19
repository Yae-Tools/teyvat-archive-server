import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import router from "./routes";
import prefetchData from "./helpers/prefetchData";

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

app.use(router);

app.get("/", (req, res) => {
  res.send("Welcome to Teyvat Archive API");
});

prefetchData();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
