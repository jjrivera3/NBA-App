import { Box, Flex, Text } from "@chakra-ui/react";
import { lighten } from "polished";

interface PlayerStatsProps {
  player: {
    stats: {
      pts: number | null;
      reb: number | null;
      ast: number | null;
      fgp: number | null;
      tptfgp: number | null;
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
  ];

  return (
    <Flex
      justify="space-between"
      align="center"
      position="relative"
      flexDirection={["column", "row"]}
      background="linear-gradient(180deg, #1a1a1d 0%, #2e2e2e 90%, #353535 100%);"
      borderBottom={`1px solid ${lighten(lightValue, firstColor)}`}
    >
      {stats.map((stat, index) => (
        <Box
          key={index}
          flex="1"
          textAlign="center"
          padding="15px"
          position="relative"
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
          <Text fontWeight="500" color={lighten(lightValue, firstColor)}>
            {stat.label}
          </Text>
          <Text fontWeight="600" fontSize="2xl" color="white">
            {stat.value}
          </Text>
        </Box>
      ))}
    </Flex>
  );
};

export default PlayerStats;
