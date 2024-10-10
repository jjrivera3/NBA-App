// components/PlayerStats.tsx
import {
  Box,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Image,
  Divider,
  Flex,
} from "@chakra-ui/react";

interface Player {
  longName?: string;
  espnName?: string;
  stats?: {
    pts?: string;
    reb?: string;
    ast?: string;
    [key: string]: any;
  };
  espnHeadshot?: string;
  team?: string;
}

interface PlayerStatsProps {
  top10Pts: Player[];
  top10Reb: Player[];
  top10Ast: Player[];
}

function TopPlayers({ top10Pts, top10Reb, top10Ast }: PlayerStatsProps) {
  const statsData = [
    {
      title: "Points Per Game",
      data: top10Pts,
      statKey: "pts",
      statLabel: "PTS",
    },
    {
      title: "Rebounds Per Game",
      data: top10Reb,
      statKey: "reb",
      statLabel: "REB",
    },
    {
      title: "Assists Per Game",
      data: top10Ast,
      statKey: "ast",
      statLabel: "AST",
    },
  ];

  return (
    <SimpleGrid columns={[1, null, 3]} spacing={5} p={0}>
      {statsData.map(({ title, data, statKey, statLabel }, idx) => (
        <Box
          key={idx}
          borderRadius="md"
          p={5}
          bg="linear-gradient(360deg, #1a1a1d 0%, #2e2e2e 80%, #353535 100%)"
          color="white"
          boxShadow="xl"
        >
          <Flex justify="space-between" mb={4}>
            <Text color="#f8991d" fontSize="sm" fontWeight={600}>
              {title}
            </Text>
            <Text color="#f8991d" fontSize="sm" fontWeight={600}>
              {statLabel}
            </Text>
          </Flex>
          <Divider mb={4} />
          <VStack align="start" spacing={3}>
            {data.map((player, index) => (
              <HStack key={index} justify="space-between" w="full">
                <HStack spacing={3}>
                  <Text
                    fontSize="sm"
                    fontWeight={index === 0 ? "bold" : "normal"}
                  >
                    {index + 1}
                  </Text>
                  <Image
                    src={player.espnHeadshot}
                    alt={player.longName || player.espnName}
                    boxSize="40px"
                    borderRadius="full"
                    objectFit="cover"
                    loading="lazy"
                  />
                  <HStack spacing={1}>
                    <Text
                      fontSize="sm"
                      fontWeight={index === 0 ? "bold" : "500"}
                    >
                      {player.longName || player.espnName}
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      {player.team}
                    </Text>
                  </HStack>
                </HStack>
                <Text
                  fontSize="sm"
                  textAlign="right"
                  fontWeight={index === 0 ? "bold" : "600"}
                >
                  {player.stats?.[statKey]}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default TopPlayers;
