import { Box, Flex, Spinner } from "@chakra-ui/react";
import { lighten } from "polished";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PlayerAdditionalInfo from "../components/PlayerAdditionalInfo";
import PlayerImage from "../components/PlayerImage";
import PlayerInfo from "../components/PlayerInfo";
import PlayerRadarChart from "../components/PlayerRadarChart";
import PlayerStats from "../components/PlayerStats";
import nbateams from "../data/nbateams";
import useAvatarSrc from "../hooks/useAvatarSrc";
import StatsTable from "../components/PlayerStatsTable";
import usePlayerStats from "../hooks/usePlayerStats";

// Define the playerStats type
interface PlayerStats {
  body: any; // Replace `any` with the correct type for body, e.g., `PlayerStat[]`
}

const PlayerDetailPage = () => {
  const location = useLocation();
  const player = location.state?.player;
  const firstColor = location.state?.firstColor;
  const teamID = location.state?.teamID;
  const espnLogo1 = location.state?.espnLogo1;
  const teamCity = location.state?.teamCity;
  const teamName = location.state?.teamName;

  const { data: playerStatsData, isLoading } = usePlayerStats(player.bRefID);
  const [avatarSrc] = useAvatarSrc(player);
  const foundTeam = nbateams.find((team) => team.teamId === teamID);
  const lightValue = foundTeam?.light || 0.2;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!player) {
    return <div>No player data found</div>;
  }

  return (
    <>
      <Box
        as="section"
        padding="20px"
        borderRadius="md"
        w={"full"}
        bg={`linear-gradient(360deg, #26262640 30%, ${firstColor} 125%)`}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
        border="1px solid #000"
        mt={5}
      >
        <Flex
          direction={["column", "row"]}
          justify="space-between"
          align="center"
          w="full"
        >
          <PlayerImage avatarSrc={avatarSrc} playerName={player?.espnName} />
          <PlayerInfo
            player={player}
            teamCity={teamCity}
            teamName={teamName}
            espnLogo1={espnLogo1}
          />
          <PlayerAdditionalInfo player={player} />
        </Flex>

        <Box height="1px" bg={lighten(lightValue, firstColor)} />
        <PlayerStats
          player={player}
          firstColor={firstColor}
          lightValue={lightValue}
        />
      </Box>

      {/* Add a new Box specifically for the StatsTable or Spinner */}
      <Box
        as="section"
        padding="20px"
        borderRadius="md"
        w={"full"}
        mt={5}
        bg="#26262640"
        boxShadow="lg"
        rounded="md"
        border="1px solid #000"
      >
        {isLoading ? (
          <Flex justify="center" align="center" h="100px">
            <Spinner size="xl" color={firstColor} />
          </Flex>
        ) : (
          playerStatsData?.playerStats.body && (
            <StatsTable
              stats={playerStatsData.playerStats.body}
              nbateams={nbateams}
            />
          )
        )}
      </Box>

      <PlayerRadarChart firstColor={firstColor} playerRating={player.rating} />
    </>
  );
};

export default PlayerDetailPage;
