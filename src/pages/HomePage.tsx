import { Box, Flex, GridItem } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import News from "../components/News";
import TeamGrid from "../components/TeamGrid";
import TeamSchedule from "../components/TeamSchedule";
import TeamStandings from "../components/TeamStandings";
import TopPlayers from "../components/TopPlayers";
import useTopPlayerStats from "../hooks/useTopPlayerStats";

function Homepage() {
  const { teamAbv, schedule } = useParams<{
    teamAbv?: string;
    schedule?: string;
  }>();
  const { top10Pts, top10Reb, top10Ast, isLoading, isError } =
    useTopPlayerStats();

  return (
    <GridItem area="main" mt={7}>
      {schedule ? (
        <TeamSchedule />
      ) : teamAbv ? (
        <TeamGrid teamAbv={teamAbv.toLowerCase()} />
      ) : (
        <>
          <HeroSection />
          {/* <TodaysGames /> */}
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
              background="#2a2a2a"
            >
              <TeamStandings />
            </Box>
            <Box
              width={{ base: "100%", lg: "35%" }}
              display="flex"
              flexDirection="column"
              flex="1"
              minHeight="600px"
              background="#2a2a2a"
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
              isLoading={isLoading}
              isError={isError}
            />
          </Box>
        </>
      )}
    </GridItem>
  );
}

export default Homepage;
