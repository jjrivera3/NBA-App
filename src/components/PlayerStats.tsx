import { Box, Flex, Grid, Text, useBreakpointValue } from "@chakra-ui/react";
import { lighten } from "polished";

interface PlayerStatsProps {
  player: {
    stats: {
      pts: number | null;
      reb: number | null;
      ast: number | null;
      fgp: number | null;
      tptfgp: number | null;
      ftp: number | null;
    };
  };
  firstColor: string;
  lightValue: number;
}

const PlayerStats = ({ player, firstColor, lightValue }: PlayerStatsProps) => {
  const stats = [
    { label: "PPG", value: player.stats.pts !== null ? player.stats.pts : "-" },
    { label: "RPG", value: player.stats.reb !== null ? player.stats.reb : "-" },
    { label: "APG", value: player.stats.ast !== null ? player.stats.ast : "-" },
    {
      label: "FG%",
      value: player.stats.fgp !== null ? `${player.stats.fgp}%` : "-",
    },
    {
      label: "3PT%",
      value: player.stats.tptfgp !== null ? `${player.stats.tptfgp}%` : "-",
    },
    {
      label: "FTP%",
      value: player.stats.ftp !== null ? `${player.stats.ftp}%` : "-",
    },
  ];

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
          border={`1px solid ${lighten(lightValue, firstColor)}`} // Not this one
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
      borderBottom={`1px solid ${lighten(lightValue, firstColor)}`} // Not this
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
