import { Box, Table, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import { lighten } from "polished";

interface Stat {
  season: string;
  team: string;
  gamesPlayed: number;
  gamesStarted: number;
  minutesPerGame: number;
  pointsPerGame: number;
  reboundsPerGame: number;
  assistsPerGame: number;
  stealsPerGame: number;
  blocksPerGame: number;
  fieldGoalsMadePerGame: number;
  fieldGoalAttemptsPerGame: number;
  fieldGoalPercentage: number;
  threePointFieldGoalsMadePerGame: number;
  threePointFieldGoalAttemptsPerGame: number;
  threePointFieldGoalPercentage: number;
  freeThrowsMadePerGame: number;
  freeThrowAttemptsPerGame: number;
  freeThrowPercentage: number;
  offensiveReboundsPerGame: number;
  defensiveReboundsPerGame: number;
  turnoversPerGame: number;
  personalFoulsPerGame: number;
  totalReboundsPerGame: number;
}

interface Team {
  teamId: string;
  name: string;
  light: number;
  info: {
    abbrev: string;
    colors: string[]; // Array of color hex values
    logoImage: string;
  };
}

interface StatsTableProps {
  stats: Stat[];
  nbateams: Team[];
}

const StatsTable = ({ stats, nbateams }: StatsTableProps) => {
  return (
    <Box overflowX="auto" background="#26262640" padding="5px">
      <Text
        fontSize="2xl"
        fontWeight="bold"
        mb="2"
        color="white"
        textAlign="left"
      >
        Career Stats
      </Text>
      <Box
        as="table"
        display="block"
        overflowX="auto"
        whiteSpace="nowrap"
        width="100%"
        paddingTop="10px"
      >
        <Table variant="striped" size="sm" minWidth="1000px">
          <Thead>
            <Tr>
              <Th>Season</Th>
              <Th>TM</Th>
              <Th isNumeric>GP</Th>
              <Th isNumeric>GS</Th>
              <Th isNumeric>MIN</Th>
              <Th isNumeric>PTS</Th>
              <Th isNumeric>REB</Th>
              <Th isNumeric>AST</Th>
              <Th isNumeric>STL</Th>
              <Th isNumeric>BLK</Th>
              <Th isNumeric>FGM</Th>
              <Th isNumeric>FGA</Th>
              <Th isNumeric>FG%</Th>
              <Th isNumeric>3PM</Th>
              <Th isNumeric>3PA</Th>
              <Th isNumeric>3P%</Th>
              <Th isNumeric>FTM</Th>
              <Th isNumeric>FTA</Th>
              <Th isNumeric>FT%</Th>
              <Th isNumeric>OREB</Th>
              <Th isNumeric>DREB</Th>
              <Th isNumeric>TOV</Th>
              <Th isNumeric>PF</Th>
            </Tr>
          </Thead>
          <Tbody>
            {stats.map((row, index) => {
              const teamData = nbateams.find((team) => {
                // Match Phoenix Suns and Brooklyn Nets abbreviations with adjustments
                if (
                  (row.team === "PHO" && team.info.abbrev === "PHX") ||
                  (row.team === "BRK" && team.info.abbrev === "BKN")
                ) {
                  return true;
                }
                return team.info.abbrev === row.team;
              });

              // Special color for Seattle (SEA)
              const seattleColor = "#ffc200";

              // Determine the color based on team data or custom Seattle color
              const primaryColor =
                row.team === "SEA"
                  ? seattleColor
                  : teamData?.info.colors[0] || "#cccccc";
              const teamColor =
                row.team === "SEA"
                  ? seattleColor
                  : lighten(teamData?.light || 0.2, primaryColor);

              // Display adjustments for team abbreviations
              const displayTeamAbbrev =
                row.team === "PHO"
                  ? "PHO"
                  : row.team === "BRK"
                  ? "BKN"
                  : row.team;

              console.log(
                `Team: ${row.team}, Display Team: ${displayTeamAbbrev}, Original Color: ${primaryColor}, Lightened Color: ${teamColor}`
              );

              return (
                <Tr key={index}>
                  <Td fontWeight="bold" color={teamColor}>
                    {row.season}
                  </Td>
                  <Td fontWeight="bold" color={teamColor}>
                    {displayTeamAbbrev}
                  </Td>
                  <Td isNumeric>{row.gamesPlayed}</Td>
                  <Td isNumeric>{row.gamesStarted}</Td>
                  <Td isNumeric>{row.minutesPerGame}</Td>
                  <Td isNumeric>{row.pointsPerGame}</Td>
                  <Td isNumeric>{row.totalReboundsPerGame}</Td>
                  <Td isNumeric>{row.assistsPerGame}</Td>
                  <Td isNumeric>{row.stealsPerGame}</Td>
                  <Td isNumeric>{row.blocksPerGame}</Td>
                  <Td isNumeric>{row.fieldGoalsMadePerGame}</Td>
                  <Td isNumeric>{row.fieldGoalAttemptsPerGame}</Td>
                  <Td isNumeric>{row.fieldGoalPercentage}</Td>
                  <Td isNumeric>{row.threePointFieldGoalsMadePerGame}</Td>
                  <Td isNumeric>{row.threePointFieldGoalAttemptsPerGame}</Td>
                  <Td isNumeric>{row.threePointFieldGoalPercentage}</Td>
                  <Td isNumeric>{row.freeThrowsMadePerGame}</Td>
                  <Td isNumeric>{row.freeThrowAttemptsPerGame}</Td>
                  <Td isNumeric>{row.freeThrowPercentage}</Td>
                  <Td isNumeric>{row.offensiveReboundsPerGame}</Td>
                  <Td isNumeric>{row.defensiveReboundsPerGame}</Td>
                  <Td isNumeric>{row.turnoversPerGame}</Td>
                  <Td isNumeric>{row.personalFoulsPerGame}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default StatsTable;
