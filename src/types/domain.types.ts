type DateEnum =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

interface IDailyDomainData {
  id: number;
  name: string;
  reward: number[];
  city: number;
}

interface IDailyDomainDataResponse {
  [key: string]: IDailyDomainData;
}

interface IRewardData {
  id: number | undefined;
  name: string | undefined;
  icon: string | null | undefined;
  stars: number | null;
}

export { IDailyDomainData, IDailyDomainDataResponse, DateEnum, IRewardData };
