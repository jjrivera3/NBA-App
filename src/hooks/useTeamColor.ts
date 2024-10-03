import { useMemo } from "react";
import nbaTeams from "../data/nbateams";

const useTeamColor = (selectedTeamId: string | null) => {
  return useMemo(() => {
    if (!selectedTeamId) return null;

    const team = nbaTeams.find((team) => team.teamId === selectedTeamId);
    return team ? team.info.colors[0] : null;
  }, [selectedTeamId]);
};

export default useTeamColor;
