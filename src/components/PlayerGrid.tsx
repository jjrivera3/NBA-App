import { Flex, SimpleGrid, Spinner } from "@chakra-ui/react";
import usePlayerRating from "../hooks/usePlayerRating";
import usePlayerRatings from "../hooks/usePlayerRatings";
import useSortedPlayers from "../hooks/useSortedPlayers";
import useTeamColor from "../hooks/useTeamColor";
import useTeamInfo from "../hooks/useTeamInfo";
import PlayerCard from "./PlayerCard";
import PlayerCardContainer from "./PlayerCardContainer";
import TeamCardSkeleton from "./PlayerCardSkeleton";
import TeamHeading from "./TeamHeading";

interface Props {
  selectedTeamId: string | null;
}

const PlayerGrid = ({ selectedTeamId }: Props) => {
  const teamColor = useTeamColor(selectedTeamId);
  const { data: teamInfo, isLoading: isTeamInfoLoading } =
    useTeamInfo(selectedTeamId);
  const allTeams = teamInfo?.body || [];

  // @ts-ignore
  const selectedTeam = allTeams.find(
    (team: { teamID: string | null }) => team.teamID === selectedTeamId
  );
  const roster = selectedTeam?.Roster || {};
  const players = Object.values(roster);

  // Get ratings and sorted players using the custom hooks
  const ratings = usePlayerRatings(players, usePlayerRating());
  const sortedPlayers = useSortedPlayers(ratings);

  return (
    <>
      {isTeamInfoLoading ? (
        <Flex justify="start" align="left" height="100px">
          <Spinner size="lg" />
        </Flex>
      ) : (
        selectedTeam && (
          <TeamHeading
            teamCity={selectedTeam.teamCity}
            teamName={selectedTeam.teamName}
            conference={selectedTeam.conference}
            espnLogo1={selectedTeam.espnLogo1}
            wins={selectedTeam.wins}
            loss={selectedTeam.loss}
          />
        )
      )}

      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding="10px"
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
                firstColor={teamColor}
              />
            ))}
      </SimpleGrid>
    </>
  );
};

export default PlayerGrid;
