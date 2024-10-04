import React from "react";
import { Table, Tbody, Td, Th, Thead, Tr, Box } from "@chakra-ui/react";

const StatsTable = () => {
  const stats = [
    {
      SEASON: "2023-24",
      TM: "LAL",
      GP: 82,
      GS: 82,
      MIN: 36.5,
      PTS: 25.4,
      REB: 7.8,
      AST: 8.1,
      STL: 1.3,
      BLK: 0.8,
      FGM: 9.5,
      FGA: 18.7,
      FG_PERCENT: 50.8,
      THREE_PM: 2.3,
      THREE_PA: 6.1,
      THREE_PERCENT: 37.5,
      FTM: 4.1,
      FTA: 5.0,
      FT_PERCENT: 82.0,
      TS_PERCENT: 59.7,
      OREB: 1.2,
      DREB: 6.6,
      TOV: 3.4,
      PF: 2.1,
    },
    {
      SEASON: "2022-23",
      TM: "LAL",
      GP: 75,
      GS: 75,
      MIN: 34.2,
      PTS: 22.1,
      REB: 6.9,
      AST: 7.5,
      STL: 1.2,
      BLK: 0.7,
      FGM: 8.8,
      FGA: 17.5,
      FG_PERCENT: 50.3,
      THREE_PM: 2.1,
      THREE_PA: 5.8,
      THREE_PERCENT: 36.4,
      FTM: 3.9,
      FTA: 4.7,
      FT_PERCENT: 81.5,
      TS_PERCENT: 58.9,
      OREB: 1.1,
      DREB: 5.8,
      TOV: 3.1,
      PF: 2.0,
    },
  ];

  return (
    <Box overflowX="auto">
      {" "}
      {/* Wrap the table in a Box with overflowX */}
      <Box
        as="table"
        display="block"
        overflowX="auto"
        whiteSpace="nowrap"
        width="100%"
      >
        <Table variant="striped" size="sm" minWidth="1000px">
          {" "}
          {/* Ensure table minWidth */}
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
            {stats.map((row, index) => (
              <Tr key={index}>
                <Td>{row.SEASON}</Td>
                <Td>{row.TM}</Td>
                <Td isNumeric>{row.GP}</Td>
                <Td isNumeric>{row.GS}</Td>
                <Td isNumeric>{row.MIN}</Td>
                <Td isNumeric>{row.PTS}</Td>
                <Td isNumeric>{row.REB}</Td>
                <Td isNumeric>{row.AST}</Td>
                <Td isNumeric>{row.STL}</Td>
                <Td isNumeric>{row.BLK}</Td>
                <Td isNumeric>{row.FGM}</Td>
                <Td isNumeric>{row.FGA}</Td>
                <Td isNumeric>{row.FG_PERCENT}</Td>
                <Td isNumeric>{row.THREE_PM}</Td>
                <Td isNumeric>{row.THREE_PA}</Td>
                <Td isNumeric>{row.THREE_PERCENT}</Td>
                <Td isNumeric>{row.FTM}</Td>
                <Td isNumeric>{row.FTA}</Td>
                <Td isNumeric>{row.FT_PERCENT}</Td>
                <Td isNumeric>{row.OREB}</Td>
                <Td isNumeric>{row.DREB}</Td>
                <Td isNumeric>{row.TOV}</Td>
                <Td isNumeric>{row.PF}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default StatsTable;
