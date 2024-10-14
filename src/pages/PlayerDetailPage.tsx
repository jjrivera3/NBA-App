import { Box, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";
import { lighten } from "polished";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PlayerAdditionalInfo from "../components/PlayerAdditionalInfo";
import PlayerAttributes from "../components/PlayerAttributes";
import PlayerImage from "../components/PlayerImage";
import PlayerInfo from "../components/PlayerInfo";
import PlayerRadarChart from "../components/PlayerRadarChart";
import PlayerStats from "../components/PlayerStats";
import StatsTable from "../components/PlayerStatsTable";
import nbateams from "../data/nbateams";
import useAvatarSrc from "../hooks/useAvatarSrc";
import usePlayerStats from "../hooks/usePlayerStats";

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
        w="full"
        bg={`linear-gradient(360deg, #26262640 30%, ${firstColor} 125%)`}
        boxShadow="2xl"
        rounded="md"
        overflow="hidden"
        border="1px solid #000"
        mt={5}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          w="full"
          wrap="wrap"
          gap={{ base: 5, md: 0 }}
        >
          {/* Inner Flex for Player Image and Player Info */}
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            gap={4}
          >
            <PlayerImage avatarSrc={avatarSrc} playerName={player?.espnName} />
            <PlayerInfo
              player={player}
              teamCity={teamCity}
              teamName={teamName}
              espnLogo1={espnLogo1}
              firstColor={firstColor}
            />
          </Flex>

          {/* Player Additional Info on the other side */}
          <PlayerAdditionalInfo player={player} />
        </Flex>

        <Box
          height="1px"
          bg={lighten(lightValue, firstColor)}
          mt={3}
          display={{ base: "none", md: "block" }}
        />

        <PlayerStats
          player={player}
          firstColor={firstColor}
          lightValue={lightValue}
        />
      </Box>

      {/* Stats Table Section */}
      <Box
        as="section"
        padding="20px"
        borderRadius="md"
        w="full"
        mt={5}
        bg="#26262640"
        boxShadow="lg"
        rounded="md"
        border="1px solid #000"
      >
        {isLoading ? (
          <Box>
            <Skeleton height="30px" mb={2} />
            <SkeletonText noOfLines={10} spacing={4} skeletonHeight="20px" />
          </Box>
        ) : (
          playerStatsData?.playerStats.body && (
            <StatsTable
              stats={playerStatsData.playerStats.body}
              nbateams={nbateams}
            />
          )
        )}
      </Box>

      {/* Radar Chart and Attributes Section */}
      <Box
        as="section"
        padding="20px"
        borderRadius="md"
        w="full"
        mt={5}
        bg="#26262640"
        boxShadow="lg"
        rounded="md"
        border="1px solid #000"
      >
        <PlayerRadarChart
          firstColor={firstColor}
          playerRating={player.rating}
        />

        {/* Attributes Grid Under Radar Chart */}
        <Box mt={5}>
          <PlayerAttributes playerRating={player.rating} />
        </Box>
      </Box>
    </>
  );
};

export default PlayerDetailPage;
