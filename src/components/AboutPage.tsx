import {
  Box,
  Button,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

const AboutPage = () => {
  const bg = useColorModeValue("gray.100", "gray.800");
  const color = useColorModeValue("gray.800", "gray.200");

  return (
    <Box
      mx="auto"
      p={6}
      bg={bg}
      borderRadius="md"
      boxShadow="xl"
      mt={8}
      color={color}
    >
      <Heading as="h1" size="xl" textAlign="center" mb={6} color="#f8991d">
        About Heat Check Hub
      </Heading>
      <VStack spacing={4} align="start">
        <Text fontSize="lg">
          Hello, I’m <strong style={{ color: "#f8991d" }}>Joseph Rivera</strong>
          , an NBA enthusiast and software engineer with a passion for
          basketball and technology. I created{" "}
          <strong style={{ color: "#f8991d" }}>Heat Check Hub</strong> as a
          one-stop destination for NBA fans to access the latest player stats,
          2K ratings, schedules, and news.
        </Text>
        <Text fontSize="lg" mt={5}>
          Heat Check Hub isn’t just a website — it’s a community for die-hard
          basketball fans. Whether you're analyzing player performance, diving
          into advanced statistics, or just keeping up with the latest games,
          Heat Check Hub has you covered.
        </Text>
        <Text fontSize="lg" mt={5}>
          One of the standout features of Heat Check Hub is the ability to
          compare player stats and 2K ratings side-by-side. Whether you're
          debating who the better player is or strategizing for your next game,
          this tool helps bring insights to your discussions.
        </Text>
        <Text fontSize="lg" mt={5}>
          My mission is to make NBA data accessible and engaging for fans like
          you. Whether you're a casual viewer or a stats junkie, Heat Check Hub
          is designed to enhance your basketball experience.
        </Text>
        <Text fontSize="lg" mt={5}>
          Have questions, feedback, or just want to talk hoops? Feel free to
          reach out — I’d love to hear from you!
        </Text>
        <Box textAlign="center" width="full" mt={4}>
          <Button
            as="a"
            href="mailto:joseph@heatcheckhub.com"
            colorScheme="orange"
            size="lg"
          >
            Contact Me
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default AboutPage;
