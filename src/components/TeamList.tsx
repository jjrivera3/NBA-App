import {
  Button,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import useTeams from "../hooks/useTeams";

interface NbaTeamListProps {
  onSelectTeam: (teamId: string, teamAbv: string) => void; // Accept both teamId and teamAbv
  selectedTeamId: string | null; // Add selectedTeamId as a prop
}

const TeamList = ({ onSelectTeam, selectedTeamId }: NbaTeamListProps) => {
  const teams = useTeams();

  // Responsive value for hover background color, only apply hover on larger screens
  const hoverBg = useBreakpointValue({ base: "transparent", md: "#1a1a1a" });

  // State to track hover status for each item
  const [hoveredTeamId, setHoveredTeamId] = useState<string | null>(null);

  const handleTeamClick = (teamId: string) => {
    const selectedTeam = teams.find((team) => team.teamId === teamId);
    if (selectedTeam) {
      const selectedAbv = selectedTeam.info.abbrev; // Grab the teamAbv
      onSelectTeam(teamId, selectedAbv); // Pass both teamId and teamAbv to the parent

      // Scroll to the top of the page
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Optional: add smooth scrolling animation
      });
    }
  };

  return (
    <>
      <Heading fontWeight={600} fontSize="1xl" marginTop={5} marginBottom={5}>
        NBA Team Rosters
      </Heading>
      <List spacing={2}>
        {teams.map((team) => (
          <ListItem
            key={team.teamId}
            paddingY="7px"
            paddingX="5px"
            borderRadius="md"
            bg={team.teamId === selectedTeamId ? "#121212" : "transparent"} // Highlight if selected
            onClick={() => handleTeamClick(team.teamId)}
            onMouseEnter={() => setHoveredTeamId(team.teamId)} // Track hover
            onMouseLeave={() => setHoveredTeamId(null)} // Reset hover
            _hover={{
              bg: hoverBg,
              cursor: "pointer",
            }}
          >
            <HStack spacing={2}>
              <Image
                boxSize="24px"
                borderRadius={8}
                objectFit="cover"
                src={team.info.logoImage}
                alt={team.name}
              />
              <Button
                fontSize="14px"
                variant="link"
                fontWeight={
                  team.teamId === selectedTeamId ||
                  team.teamId === hoveredTeamId
                    ? "bold"
                    : "normal"
                }
                color={team.teamId === selectedTeamId ? "white" : "white"}
                _hover={{ textDecoration: "none" }}
              >
                {team.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default TeamList;
