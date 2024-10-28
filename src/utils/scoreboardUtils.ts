// scoreboardUtils.ts

export const formatDateTime = (isoString: string): string => {
  const date = new Date(isoString);
  return isNaN(date.getTime())
    ? "Time Unavailable"
    : date.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });
};

export const getTeamOnlyName = (teamName: string): string =>
  teamName.split(" ").slice(-1)[0];

export const fillScores = (linescores: number[]): (number | string)[] =>
  linescores
    .map((score) => (score === 0 ? "-" : score))
    .concat(["-", "-", "-", "-"])
    .slice(0, 4);
