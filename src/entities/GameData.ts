export default interface GameData {
  events: {
    competitions?: {
      date: string;
      competitors: {
        homeAway: string;
        team: {
          abbreviation: string;
          logo: string;
        };
        score?: string;
      }[];
    }[];
    status: {
      type: {
        shortDetail: any;
        name: string;
      };
    };
  }[];
}
