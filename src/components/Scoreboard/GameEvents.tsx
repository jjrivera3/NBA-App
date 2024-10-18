import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import ScoreboardScoreCard from "./ScoreboardScoreCard";
import TopPerformers from "./TopPerformers";
import ScheduledGameDetails from "./ScheduledGameDetails";
import GameEvent from "../../entities/GameEvent";
import ScoreboardScoreCardSkeleton from "../skeletons/ScoreboardScoreCardSkeleton";

interface GameEventsProps {
  events: GameEvent[];
  isLoading: boolean;
  error: any;
  getTopPerformerDisplayValue: (team: any) => string;
}

const GameEvents: React.FC<GameEventsProps> = ({
  events,
  isLoading,
  error,
  getTopPerformerDisplayValue,
}) => {
  if (isLoading) {
    return (
      <VStack spacing={4} width="100%">
        {Array.from({ length: 4 }).map((_, index) => (
          <ScoreboardScoreCardSkeleton key={index} />
        ))}
      </VStack>
    );
  }

  if (error) {
    return <Text color="red.300">Error loading data</Text>;
  }

  // Sort events by game status
  const sortedEvents = events.sort((a, b) => {
    const statusA = a.competitions[0].status.type.name;
    const statusB = b.competitions[0].status.type.name;

    // Move STATUS_FINAL to the bottom
    if (statusA === "STATUS_FINAL" && statusB !== "STATUS_FINAL") return 1;
    if (statusB === "STATUS_FINAL" && statusA !== "STATUS_FINAL") return -1;
    return 0; // Keep the order for other statuses
  });

  return (
    <Box width="100%" mt={4} borderRadius="md">
      {sortedEvents.length > 0 ? (
        sortedEvents.map((event) => {
          const competition = event.competitions[0];
          const homeTeam = competition.competitors.find(
            (team) => team.homeAway === "home"
          );
          const awayTeam = competition.competitors.find(
            (team) => team.homeAway === "away"
          );
          const isScheduled =
            competition.status.type.name === "STATUS_SCHEDULED";

          // Ensure we extract the correct records from the array
          const getRecordSummary = (team: any) => {
            const overallRecord = team?.records?.find(
              (record: { name: string }) => record.name === "overall"
            );
            return overallRecord?.summary || "Record N/A";
          };

          // Log the home and away team records
          const awayRecord = getRecordSummary(awayTeam);
          const homeRecord = getRecordSummary(homeTeam);

          return (
            <Flex
              key={competition.id}
              mb={5}
              width="100%"
              mx="auto"
              borderRadius="md"
              boxShadow="md"
              alignItems="center"
              background="linear-gradient(145deg, #464646, #3a3a3a, #333333)"
            >
              <Box width="60%">
                <ScoreboardScoreCard
                  game={{
                    gameID: competition.id,
                    date: event.date,
                    awayTeamColor: awayTeam?.team.color ?? "#000000",
                    homeTeamColor: homeTeam?.team.color ?? "#000000",
                    awayLogo: awayTeam?.team.logo ?? "",
                    homeLogo: homeTeam?.team.logo ?? "",
                    awayTeam: awayTeam?.team.displayName ?? "Unknown Team",
                    homeTeam: homeTeam?.team.displayName ?? "Unknown Team",
                    awayScore: awayTeam?.score ?? "0",
                    homeScore: homeTeam?.score ?? "0",
                    statusType:
                      competition.status.type.name ?? "Unknown Status",
                    shortDetail: competition.status.type.shortDetail ?? "",
                    awayLinescores: awayTeam?.linescores?.map(
                      (score) => score.value
                    ) || [0, 0, 0, 0],
                    homeLinescores: homeTeam?.linescores?.map(
                      (score) => score.value
                    ) || [0, 0, 0, 0],
                    awayRecord: awayRecord,
                    homeRecord: homeRecord,
                  }}
                />
              </Box>

              {!isScheduled && (
                <TopPerformers
                  awayTeam={{
                    ...awayTeam?.team,
                    leaders: awayTeam?.leaders,
                  }}
                  homeTeam={{
                    ...homeTeam?.team,
                    leaders: homeTeam?.leaders,
                  }}
                  getTopPerformerDisplayValue={getTopPerformerDisplayValue}
                />
              )}

              {isScheduled && (
                <ScheduledGameDetails
                  venue={{
                    fullName: competition.venue.fullName,
                    address: {
                      city: competition.venue.address.city,
                      state: competition.venue.address.state,
                    },
                  }}
                  odds={{
                    provider: {
                      name: competition.odds?.[0]?.provider?.name ?? "",
                    },
                    details: competition.odds?.[0]?.details ?? "",
                    overUnder: competition.odds?.[0]?.overUnder ?? "",
                  }}
                  tickets={{
                    summary: competition.tickets?.[0]?.summary ?? "",
                    numberAvailable:
                      competition.tickets?.[0]?.numberAvailable ?? 0,
                    links:
                      competition.tickets?.[0]?.links.map(
                        (link: { href: any }) => link.href
                      ) ?? [],
                  }}
                />
              )}
            </Flex>
          );
        })
      ) : (
        <Text color="white" fontSize="lg" textAlign="center">
          No Games
        </Text>
      )}
    </Box>
  );
};

export default GameEvents;
