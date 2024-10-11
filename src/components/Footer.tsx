// components/Footer.tsx
import {
  Box,
  Text,
  HStack,
  Link,
  Icon,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

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
        <HStack spacing={4}>
          <Link href="https://twitter.com" isExternal>
            <Icon as={FaTwitter} w={6} h={6} _hover={{ color: "gray.400" }} />
          </Link>
          <Link href="https://facebook.com" isExternal>
            <Icon as={FaFacebook} w={6} h={6} _hover={{ color: "gray.400" }} />
          </Link>
          <Link href="https://instagram.com" isExternal>
            <Icon as={FaInstagram} w={6} h={6} _hover={{ color: "gray.400" }} />
          </Link>
        </HStack>
        <Divider borderColor="gray.600" />
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
        <Text fontSize="xs" color="gray.500">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Text>
      </VStack>
    </Box>
  );
};

export default Footer;
