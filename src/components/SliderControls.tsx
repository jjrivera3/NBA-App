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
        icon={<ChevronLeftIcon boxSize={{ base: 6, md: 5 }} />} // Smaller icon size on desktop
        onClick={handlePrevious}
        color="#f8991d"
        variant="ghost"
        size={{ base: "sm", md: "md" }} // Smaller button size on desktop
        mr={2}
        borderRadius="10px"
        background="linear-gradient(135deg, #44464b, #6b6b6b)"
        _hover={{ backgroundColor: "rgba(80, 80, 80, 0.7)" }}
        p={{ base: 4, md: 3 }} // Adjusted padding on desktop
        h={{ base: "35px", md: "30px" }} // Smaller height on desktop
        w={{ base: "35px", md: "30px" }} // Smaller width on desktop
      />
      <IconButton
        aria-label="Next"
        icon={<ChevronRightIcon boxSize={{ base: 6, md: 5 }} />} // Smaller icon size on desktop
        onClick={handleNext}
        color="#f8991d"
        variant="ghost"
        size={{ base: "sm", md: "md" }} // Smaller button size on desktop
        borderRadius="10px"
        background="linear-gradient(135deg, #44464b, #6b6b6b)"
        _hover={{ backgroundColor: "rgba(80, 80, 80, 0.7)" }}
        p={{ base: 4, md: 3 }} // Adjusted padding on desktop
        h={{ base: "35px", md: "30px" }} // Smaller height on desktop
        w={{ base: "35px", md: "30px" }} // Smaller width on desktop
      />
    </Flex>
  );
};

export default SliderControls;
