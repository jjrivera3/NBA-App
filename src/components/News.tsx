// components/News.tsx
import {
  Box,
  Text,
  VStack,
  Spinner,
  Image,
  Link,
  Flex,
  Divider,
  Button,
} from "@chakra-ui/react";
import useNews from "../hooks/useNews";

// Define the NewsArticle interface
interface NewsArticle {
  link: string;
  image: string;
  title: string;
  playerIDs: string[];
}

const News = () => {
  const { data, isLoading, isError } = useNews({});

  if (isLoading) {
    return <Spinner size="lg" />;
  }

  if (isError) {
    return <Text color="red.500">Error loading news</Text>;
  }

  const newsArticles: NewsArticle[] = Array.isArray(data?.body)
    ? data.body.slice(0, 8)
    : [];

  return (
    <>
      <Text
        fontSize="2xl"
        fontWeight="bold"
        color="white"
        paddingTop={5}
        paddingLeft={5}
      >
        Top Headlines
      </Text>
      <VStack align="stretch" spacing={0} borderRadius="md" p={3}>
        {newsArticles.map((article, index) => (
          <Box key={index} p={4}>
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={5}
              alignItems="center"
            >
              <VStack align="start" spacing={2} flex="1">
                <Link href={article.link} isExternal>
                  <Text fontWeight={600} fontSize="12px" color="white">
                    {article.title}
                  </Text>
                </Link>
              </VStack>
            </Flex>
            {index < newsArticles.length - 1 && (
              <Divider mt={4} borderColor="gray.600" />
            )}
          </Box>
        ))}
        <Box p={4} textAlign="center">
          <Button
            colorScheme="gray"
            variant="outline"
            size="sm"
            _hover={{ bg: "gray.700" }}
            onClick={() => {
              // Handle "See More News" button click here
            }}
          >
            See More News
          </Button>
        </Box>
      </VStack>
    </>
  );
};

export default News;
