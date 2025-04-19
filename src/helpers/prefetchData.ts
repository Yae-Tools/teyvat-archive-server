import {
  fetchAbyssBlessingInfo,
  fetchAbyssInfo,
  fetchAmberEvents,
  fetchDailyDomainInfo,
  fetchHoyoCalendar,
  fetchHoyoGameRequest,
  fetchHoyoPlayRequest,
  fetchRedeemCodes
} from "../services/system.service";

const prefetchData = async () => {
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

export default prefetchData;
