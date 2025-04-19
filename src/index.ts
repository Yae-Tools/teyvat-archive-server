import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import router from "./routes";
import {
  fetchHoyoPlayRequest,
  fetchHoyoGameRequest,
  fetchHoyoCalendar,
  fetchAmberEvents,
  fetchRedeemCodes,
  fetchAbyssInfo,
  fetchAbyssBlessingInfo,
  fetchDailyDomainInfo
} from "./services/system.service";

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

app.use(router);
const preFetchData = async () => {
  await Promise.all([
    fetchHoyoPlayRequest(),
    fetchHoyoGameRequest(),
    fetchHoyoCalendar(),
    fetchAmberEvents(),
    fetchRedeemCodes(),
    fetchAbyssInfo(),
    fetchAbyssBlessingInfo(),
    fetchDailyDomainInfo()
  ]);
};

preFetchData();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
