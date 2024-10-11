import {
  Box,
  VStack,
  Text,
  Flex,
  Image,
  Divider,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
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
  } = useTeamInfo(null, {
    teamStats: "true",
  });

  const [selectedConference, setSelectedConference] = useState<"East" | "West">(
    "East"
  );

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading team standings.</Text>;

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

  const renderStandings = (teams: Team[]) => (
    <VStack align="start" spacing={3}>
      <Flex align="center" justify="space-between" mb={2} w="100%">
        <Text color="#f8991d" fontSize="sm" fontWeight={600} w="50%">
          Team
        </Text>
        <Text
          color="#f8991d"
          fontSize="sm"
          fontWeight={600}
          w="15%"
          textAlign="center"
        >
          Wins
        </Text>
        <Text
          color="#f8991d"
          fontSize="sm"
          fontWeight={600}
          w="15%"
          textAlign="center"
        >
          Losses
        </Text>
        <Text
          color="#f8991d"
          fontSize="sm"
          fontWeight={600}
          w="20%"
          textAlign="right"
        >
          GB
        </Text>
      </Flex>
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
            <Text w="15%" textAlign="center" fontSize="sm" fontWeight={600}>
              {team.wins}
            </Text>
            <Text w="15%" textAlign="center" fontSize="sm" fontWeight={600}>
              {team.loss}
            </Text>
            <Text w="20%" textAlign="right" fontSize="sm" fontWeight={600}>
              {index === 0 ? "-" : calculateGamesBack(teams[0], team)}
            </Text>
          </Flex>
        </Box>
      ))}
    </VStack>
  );

  return (
    <Flex direction={{ base: "column", lg: "row" }} gap={10} mt={0}>
      {/* Standings Box */}
      <Box
        p={5}
        borderRadius="md"
        width={{ base: "100%", lg: "100%" }}
        borderColor="#2a2b2f" // A dark gray color for a subtle effect
      >
        <Text fontSize="2xl" fontWeight="bold" color="white" mb={5}>
          Standings
        </Text>
        <ButtonGroup isAttached borderRadius="full" mb={5} width="100%">
          <Button
            flex="1"
            leftIcon={<Image src={westLogo} boxSize="20px" />}
            bg={selectedConference === "West" ? "gray.500" : "gray.700"}
            color="white"
            borderRadius="full"
            _hover={{
              bg: selectedConference === "West" ? "gray.400" : "gray.600",
            }}
            _active={{ bg: "gray.600" }}
            onClick={() => setSelectedConference("West")}
          >
            Western
          </Button>
          <Button
            flex="1"
            leftIcon={<Image src={eastLogo} boxSize="20px" />}
            bg={selectedConference === "East" ? "gray.500" : "gray.700"}
            color="white"
            borderRadius="full"
            _hover={{
              bg: selectedConference === "East" ? "gray.400" : "gray.600",
            }}
            _active={{ bg: "gray.600" }}
            onClick={() => setSelectedConference("East")}
          >
            Eastern
          </Button>
        </ButtonGroup>
        <Divider mb={4} />
        {selectedConference === "East"
          ? renderStandings(eastTeams)
          : renderStandings(westTeams)}
      </Box>
    </Flex>
  );
};

export default TeamStandings;
