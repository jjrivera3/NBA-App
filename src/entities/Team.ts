// Define the structure for a team
export default interface Team {
  Roster(Roster: any): unknown;
  teamName(arg0: string, teamName: any): unknown;
  color: any;
  logo: string;
  abbreviation: string;
  teamId: string;
  name: string;
  light: number;
  info: {
    name: any;
    city: string;
    abbrev: string;
    colors: string[];
    logoImage: string;
  };
}
