import TeamInfo from "./TeamInfo";

// Define the structure for a team
export default interface Team {
  teamId: string;
  name: string;
  info: TeamInfo; // This references the corrected TeamInfo interface
}
