export default interface ScoreboardScoreCardProps {
  game: {
    gameID: string;
    awayTeamColor: string;
    homeTeamColor: string;
    awayLogo: string;
    homeLogo: string;
    awayTeam: string;
    homeTeam: string;
    awayScore: string;
    homeScore: string;
    awayLinescores?: number[];
    homeLinescores?: number[];
    statusType: string;
    shortDetail: string;
    awayRecord: string; // Expecting a string for record now
    homeRecord: string; // Expecting a string for record now
    date: string;
  };
}
