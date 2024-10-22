import { Box, Flex, Grid, Text, useBreakpointValue } from "@chakra-ui/react";
import { lighten } from "polished";

const PlayerStats = ({
  firstColor,
  lightValue,
}: {
  firstColor: string;
  lightValue: number;
}) => {
  // Hard-code the stats to zero for now
  const stats = [
    { label: "PPG", value: 0 },
    { label: "RPG", value: 0 },
    { label: "APG", value: 0 },
    { label: "FG%", value: "0%" },
    { label: "3PT%", value: "0%" },
    { label: "FTP%", value: "0%" },
  ];

  // const stats = player
  //   ? [
  //       {
  //         label: "PPG",
  //         value: player.stats.pts !== null ? player.stats.pts : 0,
  //       },
  //       {
  //         label: "RPG",
  //         value: player.stats.reb !== null ? player.stats.reb : 0,
  //       },
  //       {
  //         label: "APG",
  //         value: player.stats.ast !== null ? player.stats.ast : 0,
  //       },
  //       {
  //         label: "FG%",
  //         value: player.stats.fgp !== null ? `${player.stats.fgp}%` : "0%",
  //       },
  //       {
  //         label: "3PT%",
  //         value: player.stats.tptfgp !== null ? `${player.stats.tptfgp}%` : "0%",
  //       },
  //       {
  //         label: "FTP%",
  //         value: player.stats.ftp !== null ? `${player.stats.ftp}%` : "0%",
  //       },
  //     ]
  //   : [
  //       { label: "PPG", value: 0 },
  //       { label: "RPG", value: 0 },
  //       { label: "APG", value: 0 },
  //       { label: "FG%", value: "0%" },
  //       { label: "3PT%", value: "0%" },
  //       { label: "FTP%", value: "0%" },
  //     ];

  // Check if the layout should be grid or flex based on screen size
  const isMobileLayout = useBreakpointValue({ base: true, md: false });

  return isMobileLayout ? (
    <Grid templateColumns="repeat(2, 1fr)" gap={4} padding={4} mt={{ base: 5 }}>
      {stats.map((stat, index) => (
        <Box
          key={index}
          textAlign="center"
          padding="15px"
          borderRadius="md"
          border={`1px solid ${lighten(lightValue, firstColor)}`}
        >
          <Text
            fontSize="16px"
            fontWeight="500"
            color={lighten(lightValue, firstColor)}
          >
            {stat.label}
          </Text>
          <Text
            fontWeight="500"
            fontSize={{ base: "1xl", sm: "lg", md: "lg", lg: "lg", xl: "2xl" }}
            color="white"
          >
            {stat.value}
          </Text>
        </Box>
      ))}
    </Grid>
  ) : (
    <Flex
      justify="space-between"
      align="center"
      background="linear-gradient(180deg, #1a1a1d 0%, #2e2e2e 90%, #353535 100%)"
      borderBottom={`1px solid ${lighten(lightValue, firstColor)}`}
    >
      {stats.map((stat, index) => (
        <Box
          key={index}
          flex="1"
          textAlign="center"
          padding="15px"
          position="relative"
          borderRadius="md"
          _after={{
            content: '""',
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: "1px",
            bg: lighten(lightValue, firstColor),
          }}
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: "1px",
            bg: lighten(lightValue, firstColor),
          }}
        >
          <Text
            fontSize="16px"
            fontWeight="500"
            color={lighten(lightValue, firstColor)}
          >
            {stat.label}
          </Text>
          <Text
            fontWeight="500"
            fontSize={{ base: "1xl", sm: "lg", md: "xl", lg: "lg", xl: "2xl" }}
            color="white"
          >
            {stat.value}
          </Text>
        </Box>
      ))}
    </Flex>
  );
};

export default PlayerStats;
