import { Box, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";
import { lighten } from "polished";
import { useEffect } from "react";
import PlayerAttributes from "../components/Player Profile/PlayerAttributes";
import PlayerImage from "../components/PlayerImage";
import PlayerRadarChart from "../components/Player Profile/PlayerRadarChart";
import StatsTable from "../components/Player Profile/PlayerStatsTable";
import nbateams from "../data/nbateams";
import useAvatarSrc from "../hooks/useAvatarSrc";
import usePlayerStats from "../hooks/usePlayerStats";
import PlayerInfo from "../components/Player Profile/PlayerInfo";
import PlayerStats from "../components/PlayerStats";
import PlayerAdditionalInfo from "../components/Player Profile/PlayerAdditionalInfo";
import { usePlayerStore } from "../usePlayerStore";
import { usePlayerAttributesStore } from "../usePlayerAttributesStore";
import PlayerCurrentSeasonStatsTable from "../components/Player Profile/PlayerCurrentSeasonStatsTable";

const PlayerDetailPage = () => {
  const { player, firstColor, teamID } = usePlayerStore((state) => state);

  // Safely access bRefID
  const { data: playerStatsData, isLoading } = usePlayerStats(
    player?.bRefID || ""
  );

  // Use player safely
  const [avatarSrc] = useAvatarSrc(player);
  const foundTeam = nbateams.find((team) => team.teamId === teamID);
  const lightValue = foundTeam?.light || 0.2;

  const setPlayerRating = usePlayerAttributesStore(
    (state) => state.setPlayerRating
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    if (player && player.rating) {
      setPlayerRating(player.rating);
    }
  }, [player, setPlayerRating]);

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
        bg={`linear-gradient(360deg, #26262640 30%, ${
          firstColor || "#000"
        } 125%)`} // Fallback to black
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
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            gap={4}
          >
            <PlayerImage avatarSrc={avatarSrc} playerName={player.espnName} />
            <PlayerInfo /> {/* Access player info from store */}
          </Flex>
          <PlayerAdditionalInfo />{" "}
          {/* Access additional player info from store */}
        </Flex>

        <Box
          height="1px"
          bg={lighten(foundTeam?.light || 0.2, firstColor || "#000")} // Fallback to black
          mt={3}
          display={{ base: "none", md: "block" }}
        />

        <PlayerStats
          firstColor={firstColor || "#000"}
          lightValue={lightValue}
        />
      </Box>

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
            <PlayerCurrentSeasonStatsTable
              stats={playerStatsData.playerStats.body}
              nbateams={nbateams}
            />
          )
        )}
      </Box>

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

      <Box
        as="section"
        padding={{ base: "0px", md: "0px" }}
        borderRadius="md"
        w="full"
        mt={5}
        boxShadow="lg"
        rounded="md"
      >
        <PlayerRadarChart />

        <Box mt={5}>
          <PlayerAttributes />
        </Box>
      </Box>
    </>
  );
};

export default PlayerDetailPage;
