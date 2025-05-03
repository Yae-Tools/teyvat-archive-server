import {
  fetchAbyssBlessingInfo,
  fetchAbyssInfo,
  fetchAmberEvents,
  fetchDailyDomainInfo,
  fetchHoyoCalendar,
  fetchHoyoGameRequest,
  fetchHoyoPlayRequest,
  fetchRedeemCodes
} from "../services/datafetch.service";
import { checkIfEnkaIsUpToDate } from "../services/enkaClient.service";

const prefetchData = async () => {
  await Promise.all([
    // checkIfEnkaIsUpToDate(),
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

export default prefetchData;
