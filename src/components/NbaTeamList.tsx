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
  onSelectTeam: (teamId: string) => void; // Accept onSelectTeam as a prop
  selectedTeamId: string | null; // Add selectedTeamId as a prop
}

const NbaTeamList = ({ onSelectTeam, selectedTeamId }: NbaTeamListProps) => {
  const teams = useTeams();

  const handleTeamClick = (teamId: string) => {
    onSelectTeam(teamId); // Notify parent component about the team selection
  };

  return (
    <>
      <Heading fontSize="1xl" marginTop={9} marginBottom={3}>
        NBA Teams
      </Heading>
      <List spacing={2}>
        {teams.map((team) => (
          <ListItem
            key={team.teamId}
            paddingY="7px"
            paddingX="10px"
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

export default NbaTeamList;
