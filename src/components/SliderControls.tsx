import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";

interface SliderControlsProps {
  handlePrevious: () => void;
  handleNext: () => void;
}

const SliderControls: React.FC<SliderControlsProps> = ({
  handlePrevious,
  handleNext,
}) => {
  return (
    <Flex alignItems="center">
      <IconButton
        aria-label="Previous"
        icon={<ChevronLeftIcon boxSize={{ base: 5, md: 7 }} />} // Smaller icon size on mobile
        onClick={handlePrevious}
        color="#f8991d"
        variant="ghost"
        size={{ base: "sm", md: "lg" }} // Smaller button size on mobile
        mr={2}
        borderRadius="10px"
        background="linear-gradient(135deg, #44464b, #6b6b6b)"
        _hover={{ backgroundColor: "rgba(80, 80, 80, 0.7)" }}
        // Adjust padding and dimensions for mobile
        p={{ base: 3, md: 4 }} // Smaller padding on mobile
        h={{ base: "28px", md: "30px" }} // Smaller height on mobile
        w={{ base: "28px", md: "30px" }} // Smaller width on mobile
      />
      <IconButton
        aria-label="Next"
        icon={<ChevronRightIcon boxSize={{ base: 5, md: 7 }} />} // Smaller icon size on mobile
        onClick={handleNext}
        color="#f8991d"
        variant="ghost"
        size={{ base: "sm", md: "lg" }} // Smaller button size on mobile
        borderRadius="10px"
        background="linear-gradient(135deg, #44464b, #6b6b6b)"
        _hover={{ backgroundColor: "rgba(80, 80, 80, 0.7)" }}
        // Adjust padding and dimensions for mobile
        p={{ base: 3, md: 4 }} // Smaller padding on mobile
        h={{ base: "28px", md: "30px" }} // Smaller height on mobile
        w={{ base: "28px", md: "10px" }} // Smaller width on mobile
      />
    </Flex>
  );
};

export default SliderControls;
