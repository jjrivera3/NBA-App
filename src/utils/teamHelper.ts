import { NbaTeam } from "../entities/NbaTeam";

export const formatDate = (gameDate: string): string => {
  const year = gameDate.slice(0, 4);
  const month = gameDate.slice(4, 6);
  const day = gameDate.slice(6, 8);
  const date = new Date(`${year}-${month}-${day}`);
  date.setDate(date.getDate() + 1);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export const getTeamDetails = (teamId: string, nbaTeams: NbaTeam[]) => {
  const team = nbaTeams.find((t) => t.teamId === teamId);
  if (team) {
    return {
      logoImage: team.info.logoImage,
      primaryColor: team.info.colors[0],
      lightValue: team.light,
      name: team.name,
      abbrev: team.info.abbrev,
    };
  }
  return {};
};
