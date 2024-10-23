export default interface Team {
  teamId: string;
  name: string;
  light: number;
  color: string;
  logo: string;
  abbreviation: string;
  info: {
    city: string;
    abbrev: string;
    colors: string[];
    logoImage: string;
  };
  Roster: {
    [key: string]: any; // Define Roster as a dictionary of players
  };
}
