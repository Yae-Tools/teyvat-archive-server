export type DateEnum =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface IDailyDomainData {
  id: number;
  name: string;
  reward: number[];
  city: number;
}

export interface IDailyDomainDataResponse {
  [key: string]: IDailyDomainData;
}

export interface IRewardData {
  id: number | undefined;
  name: string | undefined;
  icon: string | null | undefined;
  stars: number | null;
}
