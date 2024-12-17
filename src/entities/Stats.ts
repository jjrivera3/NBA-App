export default interface Stats {
  fgm: string;
  fga: string;
  tptfgm: string;
  tptfga: string;
  ftm: string;
  fta: string;
  OffReb: string;
  DefReb: string;
  TOV: string;
  blk: string;
  stl: string;
  mins: string;
  gamesPlayed: string;
  ftp: null;
  tptfgp: null;
  fgp: null;
  pts: string;
  reb: string;
  ast: string;
}

export interface Stat {
  season: string;
  team: string;
  gamesPlayed: number;
  gamesStarted: number;
  minutesPerGame: number;
  pointsPerGame: number;
  reboundsPerGame: number;
  assistsPerGame: number;
  stealsPerGame: number;
  blocksPerGame: number;
  fieldGoalsMadePerGame: number;
  fieldGoalAttemptsPerGame: number;
  fieldGoalPercentage: number;
  threePointFieldGoalsMadePerGame: number;
  threePointFieldGoalAttemptsPerGame: number;
  threePointFieldGoalPercentage: number;
  freeThrowsMadePerGame: number;
  freeThrowAttemptsPerGame: number;
  freeThrowPercentage: number;
  offensiveReboundsPerGame: number;
  defensiveReboundsPerGame: number;
  turnoversPerGame: number;
  personalFoulsPerGame: number;
  totalReboundsPerGame: number;
}
