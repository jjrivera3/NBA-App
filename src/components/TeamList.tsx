import {
  Button,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
} from "@chakra-ui/react";
import useTeams from "../hooks/useTeams";

interface NbaTeamListProps {
  onSelectTeam: (teamId: string, teamAbv: string) => void; // Accept both teamId and teamAbv
  selectedTeamId: string | null; // Add selectedTeamId as a prop
}

const TeamList = ({ onSelectTeam, selectedTeamId }: NbaTeamListProps) => {
  const teams = useTeams();

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
      <Heading fontSize="1xl" marginTop={5} marginBottom={3}>
        NBA Teams
      </Heading>
      <List spacing={2}>
        {teams.map((team) => (
          <ListItem
            key={team.teamId}
            paddingY="7px"
            paddingX="5px"
            borderRadius="md"
            cursor="pointer"
            bg={team.teamId === selectedTeamId ? "#121212" : "transparent"} // Highlight if selected
            onClick={() => handleTeamClick(team.teamId)}
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
                fontWeight={team.teamId === selectedTeamId ? "bold" : "normal"} // Conditionally make it bold
                color={team.teamId === selectedTeamId ? "white" : "white"} // Optional text color change
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
