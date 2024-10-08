// src/hooks/useTeamDetails.ts
import nbaTeams from "../data/nbateams";

const useTeamDetails = (teamId: string | null) => {
  if (!teamId) return null;

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
  return null;
};

export default useTeamDetails;
