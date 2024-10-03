import Ratings from "./Ratings";
import Stats from "./Stats";

export default interface Player {
  stats: Stats;
  teamId: string;
  team: string;
  playerID: string;
  name: string;
  pos: string;
  height: string;
  weight: string;
  yearsOfExperience: string;
  espnHeadshot: string;
  jerseyNum: string;
  espnName: string;
  rating: Ratings;
}
