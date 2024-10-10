import { GridItem, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import TeamGrid from "../components/TeamGrid";
import TeamSchedule from "../components/TeamSchedule";
import useTopPlayerStats from "../hooks/useTopPlayerStats";

import HeroSection from "../components/HeroSection";
import TopPlayers from "../components/TopPlayers";
import TeamStandings from "../components/TeamStandings"; // Import the new component

function Homepage() {
  const { teamAbv, schedule } = useParams<{
    teamAbv?: string;
    schedule?: string;
  }>();
  const { top10Pts, top10Reb, top10Ast, isLoading, isError } =
    useTopPlayerStats();

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  if (isError) {
    return <div>Error loading data</div>;
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
          <TeamStandings />
          <TopPlayers
            top10Pts={top10Pts}
            top10Reb={top10Reb}
            top10Ast={top10Ast}
          />
        </>
      )}
    </GridItem>
  );
}

export default Homepage;
