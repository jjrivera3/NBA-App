import GameSchedule from "./GameSchedule";
import TeamInfo from "./TeamInfo";

export interface NbaTeam {
  teamId: string;
  name: string;
  info: TeamInfo;
  light: number;
  teamCity?: string;
  conference?: string;
  teamSchedule?: GameSchedule[];
  wins?: number;
  loss?: number;
}
