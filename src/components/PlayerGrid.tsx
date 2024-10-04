import { Flex, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import nbaTeams from "../data/nbateams";
import usePlayerRatingsMap from "../hooks/usePlayerRatingsMap";
import useRoster from "../hooks/useRoster";
import useSortedPlayers from "../hooks/useSortedPlayers";
import useTeamColor from "../hooks/useTeamColor";
import useTeamInfo from "../hooks/useTeamInfo";
import PlayerCard from "./PlayerCard";
import PlayerCardContainer from "./PlayerCardContainer";
import TeamCardSkeleton from "./PlayerCardSkeleton";
import TeamHeading from "./TeamHeading";
import Utah_Jazz from "../assets/Utah_Jazz.png"; // Import Utah Jazz image

const PlayerGrid = () => {
  const { teamAbv } = useParams<{ teamAbv?: string }>(); // Get teamAbv from the URL
  const lowercasedTeamAbv = teamAbv ? teamAbv.toLowerCase() : null; // Lowercase the teamAbv

  // Find the team that matches the lowercased teamAbv and get the teamId
  const selectedAbv = nbaTeams.find(
    (team) => team.info.abbrev.toLowerCase() === lowercasedTeamAbv
  );

  const teamId = selectedAbv ? selectedAbv.teamId : null;

  const teamColor = useTeamColor(teamId);
  const { data: teamInfo, isLoading: isTeamInfoLoading } = useTeamInfo(teamId);

  // Extract the roster using the custom hook
  const roster = useRoster(teamInfo, teamId);

  // Map player ratings and sort players
  const playersWithRatings = usePlayerRatingsMap(roster);
  const sortedPlayers = useSortedPlayers(playersWithRatings);

  // Find the selected team from teamInfo based on selectedTeamId
  //@ts-ignore
  const selectedTeam = teamInfo?.body?.find(
    (team: { teamID: string | null }) => team.teamID === teamId
  );

  // If selected team's ID equals "29", set the espnLogo to the Utah Jazz logo
  const espnLogo1 =
    selectedTeam?.teamID === "29" ? Utah_Jazz : selectedTeam?.espnLogo1;

  // Provide a default color if teamColor is null
  const defaultColor = "#000000"; // Use white or any fallback color you prefer

  return (
    <>
      {isTeamInfoLoading ? (
        // Show a spinner while loading team info
        <Flex justify="start" align="left" height="100px">
          <Spinner size="lg" color="#f8991d" />
        </Flex>
      ) : (
        selectedTeam && (
          <TeamHeading
            teamCity={selectedTeam.teamCity}
            teamName={selectedTeam.teamName}
            conference={selectedTeam.conference}
            espnLogo1={espnLogo1} // Use the conditional espnLogo1
            wins={selectedTeam.wins}
            loss={selectedTeam.loss}
            firstColor={teamColor || defaultColor} // Use default color if teamColor is null
          />
        )
      )}

      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding="0px"
        spacing={2}
      >
        {isTeamInfoLoading
          ? Array.from({ length: 15 }, (_, index) => (
              <PlayerCardContainer key={index}>
                <TeamCardSkeleton />
              </PlayerCardContainer>
            ))
          : sortedPlayers.map((player: any) => (
              <PlayerCard
                key={player.playerID}
                player={player}
                firstColor={teamColor || defaultColor} // Ensure a valid color
                espnLogo1={espnLogo1} // Use the conditional espnLogo1
                teamCity={selectedTeam.teamCity}
                teamName={selectedTeam.teamName}
                teamID={selectedTeam.teamID}
              />
            ))}
      </SimpleGrid>
    </>
  );
};

export default PlayerGrid;
