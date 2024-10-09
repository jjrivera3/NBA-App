import hero_bg from "../assets/hero_bg.jpeg";

// Existing imports
import {
  GridItem,
  Box,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Image,
  Spinner,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TeamGrid from "../components/TeamGrid";
import TeamSchedule from "../components/TeamSchedule";
import useTeamInfo from "../hooks/useTeamInfo";

// Define the Player type if you haven’t already
interface Player {
  longName?: string;
  espnName?: string;
  stats?: {
    pts?: string;
    reb?: string;
    ast?: string;
    [key: string]: any;
  };
  espnHeadshot?: string;
  team?: string;
}

type StatsKeys = "pts" | "reb" | "ast";

function Homepage() {
  const { teamAbv, schedule } = useParams<{
    teamAbv?: string;
    schedule?: string;
  }>();
  const lowercasedTeamAbv = teamAbv?.toLowerCase();

  const {
    data: allTeamsData,
    isLoading,
    isError,
  } = useTeamInfo(null, { rosters: "true", statsToGet: "averages" });

  const [top10Pts, setTop10Pts] = useState<Player[]>([]);
  const [top10Reb, setTop10Reb] = useState<Player[]>([]);
  const [top10Ast, setTop10Ast] = useState<Player[]>([]);

  useEffect(() => {
    const players: Player[] = [];

    if (allTeamsData?.body) {
      allTeamsData.body.forEach((team) => {
        if (team.Roster) {
          Object.values(team.Roster).forEach((player) => {
            const typedPlayer = player as Player;
            players.push(typedPlayer);
          });
        }
      });

      const getTop10ByStat = (stat: StatsKeys) => {
        return players
          .filter((player) => player.stats && player.stats[stat] !== undefined)
          .sort(
            (a, b) =>
              parseFloat(b.stats![stat] || "0") -
              parseFloat(a.stats![stat] || "0")
          )
          .slice(0, 5);
      };

      setTop10Pts(getTop10ByStat("pts"));
      setTop10Reb(getTop10ByStat("reb"));
      setTop10Ast(getTop10ByStat("ast"));
    }
  }, [allTeamsData]);

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <GridItem area="main" mt={7}>
      {schedule ? (
        <TeamSchedule /> // Render TeamSchedule component
      ) : lowercasedTeamAbv ? (
        <TeamGrid teamAbv={lowercasedTeamAbv} /> // Render TeamGrid component for the roster
      ) : (
        <>
          {/* Hero Section */}
          <Box
            position="relative"
            bgImage={`url(${hero_bg})`}
            bgSize="cover"
            bgPosition="center"
            color="white"
            p={10}
            mb={10}
            borderRadius="md"
            boxShadow="xl"
            textAlign="center"
            h="300px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {/* Overlay */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.6) 100%)"
              borderRadius="md"
              zIndex={1}
            />
            {/* Text Content */}
            <VStack spacing={4} zIndex={2}>
              <Text
                fontSize="3xl"
                fontWeight={600}
                color="#f8991d"
                textShadow="2px 2px 8px rgba(0, 0, 0, 0.8)"
              >
                Welcome to Heat Check Stats
              </Text>
              <Text
                fontSize="lg"
                maxW="1000px"
                textShadow="1px 1px 6px rgba(0, 0, 0, 0.7)"
              >
                Your go-to source for current NBA player stats, 2K ratings,
                schedules, player news, and more! Dive into detailed stats, get
                insights, and explore all things NBA with us.
              </Text>
            </VStack>
          </Box>

          {/* League Leaders Section */}
          <SimpleGrid columns={[1, null, 3]} spacing={5} p={0}>
            {[
              {
                title: "Points Per Game",
                data: top10Pts,
                statKey: "pts",
                statLabel: "PTS",
              },
              {
                title: "Rebounds Per Game",
                data: top10Reb,
                statKey: "reb",
                statLabel: "REB",
              },
              {
                title: "Assists Per Game",
                data: top10Ast,
                statKey: "ast",
                statLabel: "AST",
              },
            ].map(({ title, data, statKey, statLabel }, idx) => (
              <Box
                key={idx}
                borderRadius="md"
                p={5}
                bg="linear-gradient(360deg, #1a1a1d 0%, #2e2e2e 80%, #353535 100%)"
                color="white"
                boxShadow="xl"
              >
                <Flex justify="space-between" mb={4}>
                  <Text color="#f8991d" fontSize="sm" fontWeight={600}>
                    {title}
                  </Text>
                  <Text color="#f8991d" fontSize="sm" fontWeight={600}>
                    {statLabel}
                  </Text>
                </Flex>
                <Divider mb={4} />
                <VStack align="start" spacing={3}>
                  {data.map((player, index) => (
                    <HStack key={index} justify="space-between" w="full">
                      <HStack spacing={3}>
                        <Text
                          fontSize="sm"
                          fontWeight={index === 0 ? "bold" : "normal"}
                        >
                          {index + 1}
                        </Text>
                        <Image
                          src={player.espnHeadshot}
                          alt={player.longName || player.espnName}
                          boxSize="40px"
                          borderRadius="full"
                          objectFit="cover"
                          loading="lazy"
                        />
                        <HStack spacing={1}>
                          <Text
                            fontSize="sm"
                            fontWeight={index === 0 ? "bold" : "500"}
                          >
                            {player.longName || player.espnName}
                          </Text>
                          <Text fontSize="xs" color="gray.400">
                            {player.team}
                          </Text>
                        </HStack>
                      </HStack>
                      <Text
                        fontSize="sm"
                        textAlign="right"
                        fontWeight={index === 0 ? "bold" : "600"}
                      >
                        {player.stats?.[statKey]}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </>
      )}
    </GridItem>
  );
}

export default Homepage;
