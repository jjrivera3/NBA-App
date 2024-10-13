// Define the structure for a team
export default interface Team {
  color: any;
  logo: string;
  abbreviation: string;
  teamId: string;
  name: string;
  light: number;
  info: {
    abbrev: string;
    colors: string[];
    logoImage: string;
  };
}
