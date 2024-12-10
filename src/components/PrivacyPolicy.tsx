import { Box, Heading, Text, VStack } from "@chakra-ui/react";

const PrivacyPolicy = () => {
  return (
    <Box p={6} mx="auto" color="gray.200">
      <VStack spacing={5} align="stretch">
        <Heading as="h1" fontSize="2xl" color="#f8991d">
          Privacy Policy for Heat Check Hub
        </Heading>
        <Text fontSize="sm">Effective Date: 12/18/24</Text>

        <Box>
          <Heading as="h2" fontSize="lg" mb={2}>
            1. Introduction
          </Heading>
          <Text>
            Welcome to [Your Basketball App Name]! Your privacy is important to
            us. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you use our app. By using the app,
            you agree to the collection and use of information in accordance
            with this policy.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" fontSize="lg" mb={2}>
            2. Information We Collect
          </Heading>
          <Heading as="h3" fontSize="md" mt={3}>
            A. Information You Provide:
          </Heading>
          <Text>
            - **Account Information:** If you create an account, we may collect
            your name, email address, and any other information you voluntarily
            provide.
          </Text>
          <Text>
            - **Preferences and Feedback:** Information about your preferences,
            feedback, and interactions with the app.
          </Text>
          <Heading as="h3" fontSize="md" mt={3}>
            B. Information Collected Automatically:
          </Heading>
          <Text>
            - **Usage Data:** Details about your interactions with the app,
            including time spent, features used, and pages visited.
          </Text>
          <Text>
            - **Device Information:** Information about your device, such as
            model, operating system, unique device identifiers, and network
            information.
          </Text>
          <Text>
            - **Location Data:** Approximate location data if you enable
            location services.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" fontSize="lg" mb={2}>
            3. How We Use Your Information
          </Heading>
          <Text>
            We use your information to: - Provide, operate, and maintain the
            app. - Personalize your experience based on your preferences. -
            Improve app functionality and user experience. - Communicate
            updates, promotions, or relevant news about the app. - Respond to
            support inquiries and resolve issues.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" fontSize="lg" mb={2}>
            4. Sharing Your Information
          </Heading>
          <Text>
            We may share your information in the following circumstances: -
            **With Your Consent:** When you provide explicit consent to share
            information. - **Service Providers:** With trusted third parties
            that perform services on our behalf, such as hosting, analytics, or
            customer support. - **Legal Requirements:** When required by law or
            to protect the rights, safety, and security of our app, users, or
            others.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" fontSize="lg" mb={2}>
            5. Data Retention
          </Heading>
          <Text>
            We retain your information only as long as necessary for the
            purposes outlined in this Privacy Policy, unless a longer retention
            period is required by law.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" fontSize="lg" mb={2}>
            6. Your Privacy Rights
          </Heading>
          <Text>
            Depending on your location, you may have the following rights: -
            Access, update, or delete your personal information. - Opt-out of
            marketing communications. - Restrict or object to certain data
            processing. For any of these requests, please contact us at [Insert
            Contact Email].
          </Text>
        </Box>

        <Box>
          <Heading as="h2" fontSize="lg" mb={2}>
            7. Security
          </Heading>
          <Text>
            We use industry-standard measures to protect your data. However, no
            method of transmission over the internet or electronic storage is
            100% secure. We cannot guarantee absolute security.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" fontSize="lg" mb={2}>
            8. Children's Privacy
          </Heading>
          <Text>
            Our app is not directed to children under the age of 13, and we do
            not knowingly collect personal information from children. If you
            believe we have collected such information, please contact us, and
            we will take appropriate steps to delete it.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" fontSize="lg" mb={2}>
            9. Third-Party Services
          </Heading>
          <Text>
            Our app may contain links to third-party websites or services. We
            are not responsible for the privacy practices of these third
            parties. Please review their privacy policies before sharing your
            information.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" fontSize="lg" mb={2}>
            10. Updates to This Privacy Policy
          </Heading>
          <Text>
            We may update this Privacy Policy from time to time. Changes will be
            posted within the app, and the "Effective Date" will be updated.
            Please review the policy periodically.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" fontSize="lg" mb={2}>
            11. Contact Us
          </Heading>
          <Text>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:
          </Text>
          <Text>Email: [Insert Contact Email]</Text>
          <Text>Address: [Insert Address, optional]</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default PrivacyPolicy;
