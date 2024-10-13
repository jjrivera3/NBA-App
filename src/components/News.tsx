// components/News.tsx
import {
  Box,
  Text,
  VStack,
  Link,
  Flex,
  Divider,
  Button,
} from "@chakra-ui/react";
import useNews from "../hooks/useNews";
import NewsSkeleton from "./skeletons/NewsSkeleton";

interface NewsArticle {
  link: string;
  image: string;
  title: string;
  playerIDs: string[];
}

const News = () => {
  const { data, isLoading, isError } = useNews({});

  if (isError) {
    return <Text color="red.500">Error loading news</Text>;
  }

  const newsArticles: NewsArticle[] = Array.isArray(data?.body)
    ? data.body.slice(0, 8)
    : [];

  if (isLoading) {
    return <NewsSkeleton />; // Use NewsSkeleton when loading
  }

  return (
    <>
      <Text
        fontSize="2xl"
        fontWeight={500}
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
                  <Text fontWeight={500} fontSize="12px" color="white">
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

// import {
//   Box,
//   Text,
//   VStack,
//   Link,
//   Flex,
//   Divider,
//   Button,
// } from "@chakra-ui/react";
// import NewsSkeleton from "./skeletons/NewsSkeleton";

// interface NewsArticle {
//   link: string;
//   image: string;
//   title: string;
//   playerIDs: string[];
// }

// const News = () => {
//   // Replace API call with static news data
//   const staticNewsArticles: NewsArticle[] = [
//     {
//       link: "https://example.com/article1",
//       image: "https://example.com/image1.jpg",
//       title: "Exciting NBA Season Opener",
//       playerIDs: ["123", "456"],
//     },
//     {
//       link: "https://example.com/article2",
//       image: "https://example.com/image2.jpg",
//       title: "Player X Sets New Scoring Record",
//       playerIDs: ["789"],
//     },
//     {
//       link: "https://example.com/article3",
//       image: "https://example.com/image3.jpg",
//       title: "Team Y Rises to the Top of the Standings",
//       playerIDs: ["1011", "1213"],
//     },
//     {
//       link: "https://example.com/article4",
//       image: "https://example.com/image4.jpg",
//       title: "Underdogs Prevail in Close Match",
//       playerIDs: ["1415"],
//     },
//     // Add more static articles as needed
//   ];

//   const isLoading = false;
//   const isError = false;

//   if (isError) {
//     return <Text color="red.500">Error loading news</Text>;
//   }

//   const newsArticles: NewsArticle[] = staticNewsArticles.slice(0, 8);

//   if (isLoading) {
//     return <NewsSkeleton />; // Use NewsSkeleton when loading
//   }

//   return (
//     <>
//       <Text
//         fontSize="2xl"
//         fontWeight={500}
//         color="white"
//         paddingTop={5}
//         paddingLeft={5}
//       >
//         Top Headlines
//       </Text>
//       <VStack align="stretch" spacing={0} borderRadius="md" p={3}>
//         {newsArticles.map((article, index) => (
//           <Box key={index} p={4}>
//             <Flex
//               direction={{ base: "column", md: "row" }}
//               gap={5}
//               alignItems="center"
//             >
//               <VStack align="start" spacing={2} flex="1">
//                 <Link href={article.link} isExternal>
//                   <Text fontWeight={500} fontSize="12px" color="white">
//                     {article.title}
//                   </Text>
//                 </Link>
//               </VStack>
//             </Flex>
//             {index < newsArticles.length - 1 && (
//               <Divider mt={4} borderColor="gray.600" />
//             )}
//           </Box>
//         ))}
//         <Box p={4} textAlign="center">
//           <Button
//             colorScheme="gray"
//             variant="outline"
//             size="sm"
//             _hover={{ bg: "gray.700" }}
//             onClick={() => {
//               // Handle "See More News" button click here
//             }}
//           >
//             See More News
//           </Button>
//         </Box>
//       </VStack>
//     </>
//   );
// };

// export default News;
