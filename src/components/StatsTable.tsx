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
        <Tbody>{/* Add your player stat rows here */}</Tbody>
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
