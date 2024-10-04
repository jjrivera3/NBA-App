import TeamInfo from "./TeamInfo";

// Define the structure for a team
export default interface Team {
  teamId: string;
  name: string;
  info: TeamInfo;
  light: number;
}
