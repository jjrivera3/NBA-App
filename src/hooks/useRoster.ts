import { useMemo } from "react";

const useRoster = (teamInfo: any, selectedTeamId: string | null) => {
  return useMemo(() => {
    if (!teamInfo) return [];

    const allTeams = teamInfo.body || [];
    const selectedTeam = allTeams.find(
      (team: { teamID: string | null }) => team.teamID === selectedTeamId
    );

    return selectedTeam?.Roster ? Object.values(selectedTeam.Roster) : [];
  }, [teamInfo, selectedTeamId]);
};

export default useRoster;
