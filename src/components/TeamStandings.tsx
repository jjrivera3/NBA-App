// components/TeamStandings.tsx
import {
  Box,
  SimpleGrid,
  VStack,
  Text,
  Flex,
  Image,
  Divider,
} from "@chakra-ui/react";
import useTeamInfo from "../hooks/useTeamInfo";
import eastLogo from "../assets/eastern_conference.webp";
import westLogo from "../assets/western_conference.webp";

// Define the expected team structure
interface Team {
  teamAbv: string;
  conferenceAbv: string;
  wins: string;
  loss: string;
  espnLogo1: string;
  teamCity: string;
  teamName: string;
}

const TeamStandings = () => {
  const {
    data: allTeamsData,
    isLoading,
    isError,
  } = useTeamInfo(null, { teamStats: "true" });

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading team standings.</Text>;

  // Ensure allTeamsData.body is an array and cast it to Team[]
  const teams: Team[] = Array.isArray(allTeamsData?.body)
    ? allTeamsData.body
    : [];

  const eastTeams = teams
    .filter((team) => team.conferenceAbv === "East")
    .sort(
      (a, b) =>
        parseInt(b.wins) - parseInt(a.wins) ||
        parseInt(a.loss) - parseInt(b.loss)
    );

  const westTeams = teams
    .filter((team) => team.conferenceAbv === "West")
    .sort(
      (a, b) =>
        parseInt(b.wins) - parseInt(a.wins) ||
        parseInt(a.loss) - parseInt(b.loss)
    );

  const calculateGamesBack = (firstPlaceTeam: Team, team: Team) => {
    const gamesBack =
      (parseInt(firstPlaceTeam.wins) -
        parseInt(team.wins) +
        (parseInt(team.loss) - parseInt(firstPlaceTeam.loss))) /
      2;
    return gamesBack % 1 === 0 ? gamesBack.toFixed(0) : gamesBack.toFixed(1);
  };

  const renderStandings = (
    teams: Team[],
    conferenceName: string,
    conferenceLogo: string
  ) => (
    <Box
      p={5}
      borderRadius="md"
      background="linear-gradient(360deg, #1a1a1d 0%, #2e2e2e 80%, #353535 100%)"
      mb={5}
    >
      <Flex alignItems="center" mb={3}>
        <Image
          src={conferenceLogo}
          alt={`${conferenceName} logo`}
          boxSize="40px"
          mr={2}
        />
        <Text fontSize="xl" fontWeight="bold">
          {conferenceName} Conference
        </Text>
      </Flex>
      <Divider mb={4} />
      {/* Headers */}
      <Flex align="center" justify="space-between" mb={2}>
        <Text color="#f8991d" fontSize="sm" fontWeight={600} w="50%">
          Team
        </Text>
        <Text
          color="#f8991d"
          fontSize="sm"
          fontWeight={600}
          w="20%"
          textAlign="center"
        >
          Wins
        </Text>
        <Text
          color="#f8991d"
          fontSize="sm"
          fontWeight={600}
          w="20%"
          textAlign="center"
        >
          Losses
        </Text>
        <Text
          color="#f8991d"
          fontSize="sm"
          fontWeight={600}
          w="10%"
          textAlign="right"
        >
          GB
        </Text>
      </Flex>
      {/* Team Rows */}
      <VStack align="start" spacing={3}>
        {teams.map((team, index) => (
          <Box key={team.teamAbv} w="full" p={2} borderRadius="md">
            <Flex alignItems="center" justifyContent="space-between">
              <Flex alignItems="center" w="50%">
                <Text fontWeight="normal" fontSize="sm" mr={2}>
                  {index + 1}
                </Text>
                <Image
                  src={team.espnLogo1}
                  alt={`${team.teamName} logo`}
                  boxSize="24px"
                  mr={2}
                />
                <Text fontSize="sm" fontWeight={500}>
                  {team.teamCity} {team.teamName}
                </Text>
              </Flex>
              <Text w="20%" textAlign="center" fontSize="sm" fontWeight={600}>
                {team.wins}
              </Text>
              <Text w="20%" textAlign="center" fontSize="sm" fontWeight={600}>
                {team.loss}
              </Text>
              <Text w="10%" textAlign="right" fontSize="sm" fontWeight={600}>
                {index === 0 ? "-" : calculateGamesBack(teams[0], team)}
              </Text>
            </Flex>
          </Box>
        ))}
      </VStack>
    </Box>
  );

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mt={5}>
      {renderStandings(westTeams, "Western", westLogo)}
      {renderStandings(eastTeams, "Eastern", eastLogo)}
    </SimpleGrid>
  );
};

export default TeamStandings;
