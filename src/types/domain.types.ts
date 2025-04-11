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

export { IDailyDomainData, IDailyDomainDataResponse, DateEnum };
