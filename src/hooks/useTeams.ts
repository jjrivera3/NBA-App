import { useState } from "react";
import nbaTeams from "../data/nbateams";
import Team from "../entities/Team";

// Hook to return NBA teams data
export const useTeams = () => {
  const [teams] = useState<Team[]>(nbaTeams);
  return teams;
};

export default useTeams;
