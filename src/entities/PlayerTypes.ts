export interface PlayerStats {
  body: any; // Replace `any` with the correct type for your player stats data, e.g., `PlayerStat[]`
}

export interface UsePlayerStatsData {
  playerStats: PlayerStats;
}
