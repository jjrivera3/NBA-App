// playerNameMap.ts - PlayerSearchWrapper
const playerNameMap: Record<string, string> = {
  "cameron-thomas": "cam-thomas",
  "nicolas-claxton": "nic-claxton",
  "moe-wagner": "moritz-wagner",
};

export const getMappedPlayerName2 = (playerName: string): string => {
  return playerNameMap[playerName.toLowerCase()] || playerName;
};
