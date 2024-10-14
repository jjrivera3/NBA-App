import { Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
// import { FaArrowLeft } from "react-icons/fa"; // Import the back arrow icon
import RatingScore from "./RatingScore";

interface Player {
  espnName: string;
  rating: {
    overallAttribute: number;
  };
  jerseyNum: string;
  pos: string;
}

interface Props {
  player: Player; // Update player type to be an object
  teamCity: string;
  teamName: string;
  espnLogo1: string;
  firstColor: string;
}

const PlayerInfo = ({
  player,
  teamCity,
  teamName,
  espnLogo1,
}: // firstColor,
Props) => {
  // const navigate = useNavigate(); // Initialize the navigate function

  // Define the responsive font size as a constant
  const responsiveFontSize = { base: 22, sm: 24, md: 22, xl: 32 };

  // Apply the font size, using the same value conditionally
  const fontSize =
    player.espnName === "Shai Gilgeous-Alexander"
      ? responsiveFontSize
      : responsiveFontSize;

  return (
    <VStack
      alignItems={{ base: "center", md: "flex-start", lg: "flex-start" }}
      spacing={2}
      mb={[2, 0]}
    >
      <Flex align="center">
        <Image
          src={espnLogo1}
          alt={`${teamName} Logo`}
          title={`${teamName} Logo`}
          boxSize="25px"
          mr={2}
        />
        <Text fontSize={["sm", "md"]} fontWeight="400" color="white">
          {teamCity} {teamName}
        </Text>
      </Flex>
      <HStack align="flex-start" spacing={2}>
        <Text fontSize={fontSize} fontWeight="200" color="white">
          {player.espnName.split(" ")[0]} {/* First name */}
        </Text>
        <Text fontSize={fontSize} fontWeight="600" color="white">
          {player.espnName.split(" ").slice(1).join(" ")} {/* Last name */}
        </Text>
      </HStack>
      <RatingScore rating={player.rating.overallAttribute} />
      <Text
        fontSize="md"
        fontWeight="400"
        color="white"
        mb={{ base: 4, md: 0 }}
      >
        #{player.jerseyNum} • {player.pos}
      </Text>

      {/* <Button
        leftIcon={<FaArrowLeft />}
        background={firstColor}
        color="white"
        size="sm"
        mt={4}
        onClick={() => navigate(-1)} // Go back to the previous page
      >
        Back to Team
      </Button> */}
    </VStack>
  );
};

export default PlayerInfo;
