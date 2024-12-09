// components/News.tsx
import { Box, Text, VStack, Link, Flex, Divider } from "@chakra-ui/react";
import useNews from "../hooks/useNews";
import NewsSkeleton from "./skeletons/NewsSkeleton";

interface NewsArticle {
  link: string;
  headline: string;
  playerIDs: string[];
}

const News = () => {
  const { data, isLoading, isError } = useNews({});

  if (isError) {
    return <Text color="red.500">Error loading news</Text>;
  }

  const newsArticles: NewsArticle[] = Array.isArray(data)
    ? data.slice(0, 10)
    : [];

  if (isLoading) {
    return <NewsSkeleton />; // Use NewsSkeleton when loading
  }

  return (
    <>
      <Text
        fontSize="2xl"
        fontWeight={500}
        color="#f8991d"
        paddingTop={5}
        paddingLeft={5}
        textAlign={{ base: "center", md: "left" }}
      >
        Top Headlines
      </Text>
      <VStack
        textAlign={{ base: "center", md: "left" }}
        align="stretch"
        spacing={0}
        borderRadius="md"
        p={3}
      >
        {newsArticles.map((article, index) => (
          <Box key={index} p={4}>
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={5}
              alignItems="center"
            >
              <VStack align="start" spacing={2} flex="1">
                <Link href={article.link} isExternal>
                  <Text fontWeight={500} fontSize="12px" color="white">
                    {article.headline}
                  </Text>
                </Link>
              </VStack>
            </Flex>
            {index < newsArticles.length - 1 && (
              <Divider mt={4} borderColor="gray.600" />
            )}
          </Box>
        ))}
      </VStack>
    </>
  );
};

export default News;
