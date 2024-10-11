import { Flex, IconButton, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface SliderControlsProps {
  handlePrevious: () => void;
  handleNext: () => void;
}

const SliderControls: React.FC<SliderControlsProps> = ({
  handlePrevious,
  handleNext,
}) => {
  return (
    <Flex alignItems="center" mb={5}>
      <Text fontSize="2xl" fontWeight={500} color="white" mr={4}>
        Today's Games
      </Text>
      <IconButton
        aria-label="Previous"
        icon={<ChevronLeftIcon boxSize={5} />}
        onClick={handlePrevious}
        color="#f8991d"
        variant="ghost"
        size="sm"
        mr={2}
        borderRadius="10px"
        background="linear-gradient(135deg, #44464b, #6b6b6b)"
        _hover={{ backgroundColor: "rgba(80, 80, 80, 0.7)" }}
      />
      <IconButton
        aria-label="Next"
        icon={<ChevronRightIcon boxSize={5} />}
        onClick={handleNext}
        color="#f8991d"
        variant="ghost"
        size="sm"
        borderRadius="10px"
        background="linear-gradient(135deg, #44464b, #6b6b6b)"
        _hover={{ backgroundColor: "rgba(80, 80, 80, 0.7)" }}
      />
    </Flex>
  );
};

export default SliderControls;
