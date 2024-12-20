import { Button, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import RatingScore from "../RatingScore";
import { usePlayerStore } from "../../usePlayerStore";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom"; // For navigation

const PlayerInfo = () => {
  const { player, teamName, espnLogo1, firstColor } = usePlayerStore(
    (state) => state
  ); // Get player from store

  const navigate = useNavigate(); // React Router hook for navigation
  const { teamAbv } = useParams<{ teamAbv: string }>();

  // Back to Team Button Click Handler
  const handleBackToTeamClick = () => {
    let adjustedTeamAbv = teamAbv;

    if (teamAbv === "gs") {
      adjustedTeamAbv = "gsw";
    } else if (teamAbv === "sa") {
      adjustedTeamAbv = "sas";
    } else if (teamAbv === "no") {
      adjustedTeamAbv = "nop";
    } else if (teamAbv === "pho") {
      adjustedTeamAbv = "phx";
    }

    navigate(`/${adjustedTeamAbv}`); // Correctly use navigate
  };
  // Define the responsive font size as a constant
  const responsiveFontSize = { base: 22, sm: 24, md: 22, xl: 32 };

  if (!player) return null; // Handle case when player is not available

  return (
    <VStack
      alignItems={{ base: "center", md: "flex-start", lg: "flex-start" }}
      spacing={2}
      mb={[2, 0]}
    >
      <Flex align="center">
        <Image
          src={espnLogo1 ?? undefined}
          alt={`${teamName} Logo`}
          title={`${teamName} Logo`}
          boxSize="25px"
          mr={2}
        />
        <Text fontSize={["sm", "md"]} fontWeight="400" color="white">
          {teamName}
        </Text>
      </Flex>
      <HStack align="flex-start" spacing={2}>
        <Text fontSize={responsiveFontSize} fontWeight="200" color="white">
          {player.espnName.split(" ")[0]} {/* First name */}
        </Text>
        <Text fontSize={responsiveFontSize} fontWeight="600" color="white">
          {player.espnName.split(" ").slice(1).join(" ")} {/* Last name */}
        </Text>
      </HStack>
      <RatingScore />
      <Text
        fontSize="md"
        fontWeight="400"
        color="white"
        mb={{ base: 4, md: 0 }}
      >
        #{player.jerseyNum} • {player.pos}
      </Text>
      <Button
        onClick={handleBackToTeamClick}
        zIndex="10"
        color="#fff"
        variant="solid"
        background={firstColor || "#000"} // Provide a fallback color
        size="sm"
        borderRadius="md"
        leftIcon={<ChevronLeftIcon />} // Add the backwards caret
      >
        Back to Team
      </Button>
    </VStack>
  );
};

export default PlayerInfo;
