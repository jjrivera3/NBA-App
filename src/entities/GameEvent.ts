export default interface GameEvent {
  id: string;
  date: string;
  competitions: {
    id: string;
    competitors: {
      homeAway: string;
      team: {
        displayName: string;
        color: string;
        logo: string;
        abbreviation: string;
        records:
          | {
              name: string;
              abbreviation: string;
              type: string;
              summary: string;
            }[]
          | undefined;
      };
      score: string;
      linescores?: { value: number }[];
      leaders?: {
        name: string;
        leaders: {
          displayValue: string;
          athlete: {
            headshot: string;
            shortName: string;
            position: {
              abbreviation: string;
            };
          };
        }[];
      }[];
    }[];
    status: {
      type: {
        name: string;
        shortDetail: string;
      };
    };
  }[];
}
