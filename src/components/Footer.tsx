// components/Footer.tsx
import { Box, Divider, HStack, Link, Text, VStack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      py={6}
      px={{ base: 4, md: 8 }}
      backgroundColor="#1b1b1b"
      color="gray.300"
      borderTop="1px solid"
      borderColor="gray.700"
      mt={10}
    >
      <VStack spacing={4}>
        <HStack spacing={4} fontSize="sm">
          <Link
            href="/about"
            _hover={{ textDecoration: "underline", color: "gray.400" }}
          >
            About
          </Link>
          <Link
            href="/contact"
            _hover={{ textDecoration: "underline", color: "gray.400" }}
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            _hover={{ textDecoration: "underline", color: "gray.400" }}
          >
            Privacy Policy
          </Link>
        </HStack>
        <Divider borderColor="gray.600" />

        <Text fontSize="xs" color="gray.500">
          © {new Date().getFullYear()} Heat Check Hub. All rights reserved.
        </Text>
      </VStack>
    </Box>
  );
};

export default Footer;
