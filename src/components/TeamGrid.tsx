import { SimpleGrid, Box } from "@chakra-ui/react";
import nbaTeams from "../data/nbateams";
import usePlayerRatingsMap from "../hooks/usePlayerRatingsMap";
import useSortedPlayers from "../hooks/useSortedPlayers";
import useTeamColor from "../hooks/useTeamColor";
import useTeamInfo from "../hooks/useTeamInfo";
import PlayerCard from "./PlayerCard";
import PlayerCardContainer from "./PlayerCardContainer";
import TeamHeading from "./TeamHeading";
import Utah_Jazz from "../assets/Utah_Jazz.png";
import PlayerCardSkeleton from "./skeletons/PlayerCardSkeleton";
import TeamHeadingSkeleton from "./skeletons/TeamHeadSkeleton";
import { useTeamStore } from "../useTeamStore";
import { useEffect } from "react";
import TeamGridProps from "../entities/TeamGriptProps";

const TeamGrid = ({ teamAbv }: TeamGridProps) => {
  const lowercasedTeamAbv = teamAbv.toLowerCase();

  const selectedAbv = nbaTeams.find(
    (team) => team.info.abbrev.toLowerCase() === lowercasedTeamAbv
  );

  const teamId = selectedAbv ? selectedAbv.teamId : null;
  const teamColor = useTeamColor(teamId);
  const { data: teamInfo, isLoading: isTeamInfoLoading } = useTeamInfo(teamId, {
    rosters: "true",
    statsToGet: "averages",
    schedules: "true",
  });

  // Zustand store actions
  const setTeamData = useTeamStore((state) => state.setTeamData);
  const setPlayersWithRatings = useTeamStore(
    (state) => state.setPlayersWithRatings
  );

  // Extract roster directly from teamInfo
  let selectedTeam = null;

  // Check if teamInfo.body is an array or an object
  if (Array.isArray(teamInfo?.body)) {
    selectedTeam = teamInfo.body.find((team) => team.teamID === teamId);
  } else if (teamInfo?.body && typeof teamInfo.body === "object") {
    selectedTeam = teamInfo.body; // Adjust this based on your actual data structure
  }

  const roster = selectedTeam?.Roster ? Object.values(selectedTeam.Roster) : [];

  const playersWithRatings = usePlayerRatingsMap(roster);
  const sortedPlayers = useSortedPlayers(playersWithRatings);

  const espnLogo1 =
    selectedTeam?.teamID === "29" ? Utah_Jazz : selectedTeam?.espnLogo1;
  const defaultColor = "#000000";

  useEffect(() => {
    if (selectedTeam) {
      setTeamData({
        firstColor: teamColor || defaultColor,
        teamID: selectedTeam.teamID,
        espnLogo1: espnLogo1,
        teamCity: selectedTeam.teamCity,
        teamName: `${selectedTeam.teamCity} ${selectedTeam.teamName}`,
        conference: selectedTeam.conference, // Add conference here
        wins: selectedTeam.wins,
        loss: selectedTeam.loss,
      });
    }
    if (playersWithRatings) {
      setPlayersWithRatings(playersWithRatings);
    }
  }, [
    selectedTeam,
    setTeamData,
    teamColor,
    espnLogo1,
    playersWithRatings,
    setPlayersWithRatings,
  ]);

  return (
    <>
      {isTeamInfoLoading ? (
        <Box mb={5}>
          <TeamHeadingSkeleton />
        </Box>
      ) : (
        selectedTeam && (
          <TeamHeading
            teamCity={selectedTeam.teamCity}
            teamName={selectedTeam.teamName}
            conference={selectedTeam.conference}
            espnLogo1={espnLogo1}
            wins={selectedTeam.wins}
            loss={selectedTeam.loss}
            firstColor={teamColor || defaultColor}
            teamAbv={teamAbv}
          />
        )
      )}

      <SimpleGrid
        columns={{ sm: 1, md: 3, lg: 3, xl: 4, "2xl": 5 }}
        spacing={2}
      >
        {isTeamInfoLoading
          ? Array.from({ length: 15 }, (_, index) => (
              <PlayerCardContainer key={index}>
                <PlayerCardSkeleton />
              </PlayerCardContainer>
            ))
          : sortedPlayers.map((player) => (
              <PlayerCard
                key={player.playerID}
                player={player}
                firstColor={teamColor || defaultColor}
                espnLogo1={espnLogo1}
                teamCity={selectedTeam.teamCity}
                teamName={`${selectedTeam.teamCity} ${selectedTeam.teamName}`}
                teamID={selectedTeam.teamID}
              />
            ))}
      </SimpleGrid>
    </>
  );
};

export default TeamGrid;
