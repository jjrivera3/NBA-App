import { Box, GridItem, Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import hero_bg from "../assets/hero_bg.jpeg";
import TeamGrid from "./TeamGrid";
import TeamSchedule from "./TeamSchedule";

function HeroSection() {
  const { teamAbv, schedule } = useParams<{
    teamAbv?: string;
    schedule?: string;
  }>();

  return (
    <GridItem area="main" mt={7}>
      {schedule ? (
        <TeamSchedule />
      ) : teamAbv ? (
        <TeamGrid teamAbv={teamAbv.toLowerCase()} />
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
              bg="linear-gradient(100deg, rgb(0 0 0 / 100%) 10%, rgb(67 42 42 / 50%) 120%);"
              borderRadius="md"
              zIndex={1}
            />
            {/* Text Content */}
            <VStack spacing={4} zIndex={2}>
              <Text
                fontSize="3xl"
                fontWeight={600}
                color="#f8991d"
                textShadow="2px 2px 8px rgba(0, 0, 0, 0.99)"
              >
                Welcome to Heat Check Central
              </Text>
              <Text
                fontSize="lg"
                maxW="1000px"
                textShadow="2px 2px 8px rgba(0, 0, 0, 0.99)"
              >
                Your go-to source for the latest NBA player stats, 2K ratings,
                schedules, and player news. Dive deep into detailed statistics,
                gain valuable insights, and explore everything NBA. Stay in the
                game with us!
              </Text>
            </VStack>
          </Box>
        </>
      )}
    </GridItem>
  );
}

export default HeroSection;
