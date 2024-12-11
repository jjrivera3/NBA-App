// playerNameMap.ts - PlayerDetailPage
const playerNameMap: Record<string, string> = {
  "cam-thomas": "cameron-thomas",
  "nic-claxton": "nicolas-claxton",
  "moritz-wagner": "moe-wagner",
};

export const getMappedPlayerName = (playerName: string): string => {
  return playerNameMap[playerName.toLowerCase()] || playerName;
};
