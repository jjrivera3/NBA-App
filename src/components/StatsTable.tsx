import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

const StatsTable = () => {
  const playerStats = [
    {
      season: "2023",
      team: "TM1",
      gp: 82,
      gs: 82,
      min: 36.7,
      pts: 25.4,
      reb: 7.8,
      ast: 5.3,
      stl: 1.3,
      blk: 0.8,
      fgm: 9.2,
      fga: 18.6,
      fgPct: 49.5,
      threePM: 2.3,
      threePA: 6.7,
      threePct: 34.5,
      ftm: 4.5,
      fta: 5.2,
      ftPct: 85.6,
      tsPct: 58.4,
      oreb: 1.1,
      dreb: 6.7,
      tov: 2.9,
      pf: 2.3,
    },
  ];

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Player Season Stats</TableCaption>
        <Thead>
          <Tr>
            <Th>Season</Th>
            <Th>TM</Th>
            <Th>GP</Th>
            <Th>GS</Th>
            <Th>MIN</Th>
            <Th>PTS</Th>
            <Th>REB</Th>
            <Th>AST</Th>
            <Th>STL</Th>
            <Th>BLK</Th>
            <Th>FGM</Th>
            <Th>FGA</Th>
            <Th>FG%</Th>
            <Th>3PM</Th>
            <Th>3PA</Th>
            <Th>3P%</Th>
            <Th>FTM</Th>
            <Th>FTA</Th>
            <Th>FT%</Th>
            <Th>TS%</Th>
            <Th>OREB</Th>
            <Th>DREB</Th>
            <Th>TOV</Th>
            <Th>PF</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            playerStats.length > 0
              ? playerStats.map((stat, index) => (
                  <Tr key={index}>
                    <Td>{stat.season}</Td>
                    <Td>{stat.team}</Td>
                    <Td>{stat.gp}</Td>
                    <Td>{stat.gs}</Td>
                    <Td>{stat.min}</Td>
                    <Td>{stat.pts}</Td>
                    <Td>{stat.reb}</Td>
                    <Td>{stat.ast}</Td>
                    <Td>{stat.stl}</Td>
                    <Td>{stat.blk}</Td>
                    <Td>{stat.fgm}</Td>
                    <Td>{stat.fga}</Td>
                    <Td>{stat.fgPct}</Td>
                    <Td>{stat.threePM}</Td>
                    <Td>{stat.threePA}</Td>
                    <Td>{stat.threePct}</Td>
                    <Td>{stat.ftm}</Td>
                    <Td>{stat.fta}</Td>
                    <Td>{stat.ftPct}</Td>
                    <Td>{stat.tsPct}</Td>
                    <Td>{stat.oreb}</Td>
                    <Td>{stat.dreb}</Td>
                    <Td>{stat.tov}</Td>
                    <Td>{stat.pf}</Td>
                  </Tr>
                ))
              : null /* Use ternary to avoid rendering empty text nodes */
          }
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Season</Th>
            <Th>TM</Th>
            <Th>GP</Th>
            <Th>GS</Th>
            <Th>MIN</Th>
            <Th>PTS</Th>
            <Th>REB</Th>
            <Th>AST</Th>
            <Th>STL</Th>
            <Th>BLK</Th>
            <Th>FGM</Th>
            <Th>FGA</Th>
            <Th>FG%</Th>
            <Th>3PM</Th>
            <Th>3PA</Th>
            <Th>3P%</Th>
            <Th>FTM</Th>
            <Th>FTA</Th>
            <Th>FT%</Th>
            <Th>TS%</Th>
            <Th>OREB</Th>
            <Th>DREB</Th>
            <Th>TOV</Th>
            <Th>PF</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default StatsTable;
