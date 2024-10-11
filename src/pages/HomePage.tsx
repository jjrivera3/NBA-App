import {
  Box,
  Flex,
  GridItem,
  Skeleton,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import News from "../components/News";
import TeamGrid from "../components/TeamGrid";
import TeamSchedule from "../components/TeamSchedule";
import TeamStandings from "../components/TeamStandings";
import TodaysGames from "../components/TodaysGames";
import TopPlayers from "../components/TopPlayers";
import useTopPlayerStats from "../hooks/useTopPlayerStats";

function Homepage() {
  const { teamAbv, schedule } = useParams<{
    teamAbv?: string;
    schedule?: string;
  }>();
  const { top10Pts, top10Reb, top10Ast, isLoading, isError } =
    useTopPlayerStats();

  if (isLoading) {
    return (
      <GridItem area="main" mt={7}>
        {/* Hero Section Skeleton */}
      </GridItem>
    );
  }

  if (isError) {
    return (
      <Box>
        <Text color="red.500">Error loading data</Text>
      </Box>
    );
  }

  return (
    <GridItem area="main" mt={7}>
      {schedule ? (
        <TeamSchedule />
      ) : teamAbv ? (
        <TeamGrid teamAbv={teamAbv.toLowerCase()} />
      ) : (
        <>
          <HeroSection />
          <TodaysGames />
          <Flex
            direction={{ base: "column", lg: "row" }}
            gap={6}
            mt={6}
            align="stretch"
          >
            <Box
              width={{ base: "100%", lg: "65%" }}
              display="flex"
              flexDirection="column"
              minHeight="600px"
              border="1px solid #00"
              borderRadius="md"
              background="linear-gradient(337deg, #1a1a1d 0%, #2e2e2e 90%, #353535 100%);"
            >
              <TeamStandings />
            </Box>
            <Box
              width={{ base: "100%", lg: "35%" }}
              display="flex"
              flexDirection="column"
              flex="1"
              minHeight="600px"
              background="linear-gradient(337deg, #1a1a1d 0%, #2e2e2e 90%, #353535 100%);"
              border="1px solid #282828"
              borderRadius="md"
            >
              <News />
            </Box>
          </Flex>

          {/* Top Players horizontal */}
          <Box width="100%" mt={6}>
            <TopPlayers
              top10Pts={top10Pts}
              top10Reb={top10Reb}
              top10Ast={top10Ast}
            />
          </Box>
        </>
      )}
    </GridItem>
  );
}

export default Homepage;
