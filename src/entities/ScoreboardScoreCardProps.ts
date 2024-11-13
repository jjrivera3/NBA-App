export default interface ScoreboardScoreCardProps {
  game: {
    gameID: string;
    date: string;
    awayTeamColor: string;
    homeTeamColor: string;
    awayLogo: string;
    homeLogo: string;
    awayTeam: string;
    homeTeam: string;
    awayScore: string;
    homeScore: string;
    statusType: string;
    shortDetail: string;
    awayLinescores: number[];
    homeLinescores: number[];
    awayRecord: string;
    homeRecord: string;
    awayAbbreviation: string; // New property for abbreviation
    homeAbbreviation: string; // New property for abbreviation
  };
  selectedDate: string;
}
