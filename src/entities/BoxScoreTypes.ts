// boxScoreTypes.ts

export interface Team {
  team: {
    displayName: string;
    logo: string;
    abbreviation: string;
    color: string;
    id: string;
  };
  homeAway: "home" | "away";
  statistics: { displayValue: string; label: string }[];
}

export interface Player {
  team: {
    color: string;
    abbreviation: any;
    logo: string | undefined;
    displayName: string;
  };
  statistics: {
    names: string[];
    athletes: {
      athlete: {
        shortName: string;
        id: string;
        displayName: string;
        headshot?: { href: string };
      };
      stats: string[];
      didNotPlay: boolean;
      reason?: string;
    }[];
    totals: string[];
  }[];
}

export interface BoxScoreData {
  teams: Team[];
  players: Player[];
  id: string;
}
