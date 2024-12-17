import { Box, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";
import { lighten } from "polished";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PlayerAdditionalInfo from "../components/Player Profile/PlayerAdditionalInfo";
import PlayerAttributes from "../components/Player Profile/PlayerAttributes";
import PlayerCurrentSeasonStatsTable from "../components/Player Profile/PlayerCurrentSeasonStatsTable";
import PlayerInfo from "../components/Player Profile/PlayerInfo";
import PlayerRadarChart from "../components/Player Profile/PlayerRadarChart";
import StatsTable from "../components/Player Profile/PlayerStatsTable";
import PlayerImage from "../components/PlayerImage";
import PlayerStats from "../components/PlayerStats";
import nbateams from "../data/nbateams";
import ratings from "../data/ratings";
import useAvatarSrc from "../hooks/useAvatarSrc";
import useFindPlayerId from "../hooks/useFindPlayerId";
import usePlayerStats from "../hooks/usePlayerStats";
import { usePlayerAttributesStore } from "../usePlayerAttributesStore";
import { usePlayerStore } from "../usePlayerStore";
import { normalizeName } from "../utils/normalizeName";
import PlayerDetailSkeleton from "../components/skeletons/PlayerDetailSkeleton";
import { getMappedPlayerName } from "../utils/playerNameMap";

const PlayerDetailPage = () => {
  const { player, firstColor, teamID, setPlayerData } = usePlayerStore(
    (state) => state
  );
  let { playerName } = useParams<{ playerName: string }>();

  // Map the playerName to its standardized version
  if (playerName) {
    playerName = getMappedPlayerName(playerName);
  }

  const { data: findPlayer, isLoading: isPlayerLoading } = useFindPlayerId(
    playerName || ""
  );
  // Safely access findPlayer data
  const normalizedPlayerName = findPlayer?.body?.[0]?.espnName
    ? normalizeName(findPlayer.body[0].espnName)
    : null;

  // Safely find the rating
  const rating = normalizedPlayerName
    ? ratings.find(
        (rating) => normalizeName(rating.name) === normalizedPlayerName
      )
    : null;

  // Create a new object by adding the rating
  const playerWithRating = findPlayer?.body?.[0]
    ? { ...findPlayer.body[0], rating }
    : null;

  useEffect(() => {
    if (playerWithRating) {
      // Check if the store already has this player data
      const isSamePlayer =
        player?.playerID === playerWithRating.playerID &&
        player?.rating?.name === playerWithRating?.rating?.name;

      if (!isSamePlayer) {
        const team = nbateams.find(
          (team) => team.teamId === playerWithRating.teamID
        );

        setPlayerData({
          player: playerWithRating,
          firstColor: team?.info.colors[0] || "#000000",
          teamID: playerWithRating.teamID || "unknown",
          espnLogo1: team?.info.logoImage || "defaultLogo.png",
          teamCity: team?.info.city || "unknown2",
          teamName: playerWithRating.rating.team || "unknown1",
          playerRating: playerWithRating.rating,
        });
      }
    }
  }, [playerWithRating, player, setPlayerData]);

  // Safely access bRefID
  const { data: playerStatsData, isLoading: isStatsLoading } = usePlayerStats(
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

  // Inside PlayerDetailPage component
  if (isPlayerLoading || isStatsLoading) {
    return <PlayerDetailSkeleton />;
  }

  // Loading state for playerStatsData
  if (isStatsLoading) {
    return (
      <Box padding="20px">
        <Skeleton height="30px" mb={2} />
        <SkeletonText noOfLines={10} spacing={4} skeletonHeight="20px" />
      </Box>
    );
  }

  // No player data found
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
        padding={{ base: "10px", md: "20px" }}
        borderRadius="md"
        w="full"
        mt={5}
        bg="#26262640"
        boxShadow="lg"
        rounded="md"
        border="1px solid #000"
      >
        {playerStatsData?.playerStats.body && (
          <PlayerCurrentSeasonStatsTable
            stats={playerStatsData.playerStats.body}
            nbateams={nbateams}
          />
        )}
      </Box>

      {playerStatsData?.playerStats?.body &&
        playerStatsData.playerStats.body.length > 0 && (
          <Box
            as="section"
            padding={{ base: "10px", md: "20px" }}
            borderRadius="md"
            w="full"
            mt={5}
            bg="#26262640"
            boxShadow="lg"
            rounded="md"
            border="1px solid #000"
          >
            <StatsTable
              stats={playerStatsData.playerStats.body}
              nbateams={nbateams}
            />
          </Box>
        )}

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
