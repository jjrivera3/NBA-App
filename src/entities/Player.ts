import Ratings from "./Ratings";
import Stats from "./Stats";

export default interface Player {
  longName: any;
  exp: string;
  college: string;
  bDay?: string;
  stats: Stats;
  teamId: string;
  team: string;
  playerID: string;
  name: string;
  pos?: string;
  height?: string;
  weight?: string;
  espnHeadshot: string;
  jerseyNum?: string;
  espnName: string;
  rating: Ratings;
  espnID?: string;
  bRefID: string;
}
