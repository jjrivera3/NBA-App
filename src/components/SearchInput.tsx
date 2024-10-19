import {
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useTeamInfo from "../hooks/useTeamInfo";

// Define the structure of a player
interface Player {
  playerID: string;
  longName: string;
  team: string;
}

// Define the structure of a team's roster and team info
interface Team {
  teamAbv: string;
  Roster: Record<string, PlayerInfo>; // Dynamic object with player data
}

interface PlayerInfo {
  playerID: string;
  longName: string;
  team: string;
}

// Define the props for the component
interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // Track the selected index
  const navigate = useNavigate();

  const { data: teamsData, isError } = useTeamInfo();

  useEffect(() => {
    if (teamsData && Array.isArray(teamsData.body)) {
      const teams = teamsData.body as Team[];

      const allPlayers: Player[] = teams.flatMap((team) => {
        const teamAbbreviation = team.teamAbv;

        return Object.values(team.Roster).map((player) => ({
          playerID: player.playerID,
          longName: player.longName,
          team: teamAbbreviation,
        }));
      });

      setPlayers(allPlayers);
      console.log("Combined Roster Players:", allPlayers);
    }
  }, [teamsData]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setSearchText(text);
    setSelectedIndex(null); // Reset selected index on search
    if (text) {
      const filtered = players.filter((player) =>
        player.longName.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPlayers(filtered);
    } else {
      setFilteredPlayers([]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault(); // Prevent scrolling the page
      setSelectedIndex((prev) =>
        prev === null ? 0 : prev < filteredPlayers.length - 1 ? prev + 1 : prev
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prev) =>
        prev === null || prev === 0 ? null : prev - 1
      );
    } else if (event.key === "Enter" && selectedIndex !== null) {
      const selectedPlayer = filteredPlayers[selectedIndex];
      if (selectedPlayer) {
        handleSelectPlayer(
          selectedPlayer.longName,
          selectedPlayer.playerID,
          selectedPlayer.team
        );
      }
    }
  };

  const formatPlayerNameForUrl = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  const handleSelectPlayer = (
    playerName: string,
    _playerID: string,
    teamAbbreviation: string
  ) => {
    setSearchText(playerName);
    setFilteredPlayers([]);
    setSelectedIndex(null); // Reset the selected index

    const formattedPlayerName = formatPlayerNameForUrl(playerName);
    const formattedTeam = teamAbbreviation.toLowerCase();

    navigate(`/${formattedTeam}/${formattedPlayerName}`);
    onSearch(playerName);
  };

  if (isError) return <p>Error fetching rosters.</p>;

  return (
    <Box position="relative">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current) onSearch(ref.current.value);
        }}
      >
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <BsSearch />
          </InputLeftElement>
          <Input
            ref={ref}
            value={searchText}
            onChange={handleSearch}
            onKeyDown={handleKeyDown} // Add key down event
            borderRadius={20}
            placeholder="Search players..."
            variant="filled"
          />
        </InputGroup>
      </form>

      {filteredPlayers.length > 0 && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          width="100%"
          zIndex={1000}
          mt={2}
          bgColor="rgba(0, 0, 0, 0.7)"
          border="1px solid gray"
          borderRadius="md"
          maxHeight="200px"
          overflowY="auto"
        >
          <List spacing={2}>
            {filteredPlayers.map((player, index) => (
              <ListItem
                key={player.playerID}
                _hover={{
                  backgroundColor: "#f8991d",
                  cursor: "pointer",
                  color: "white",
                }}
                onClick={() =>
                  handleSelectPlayer(
                    player.longName,
                    player.playerID,
                    player.team
                  )
                }
                px={3}
                py={2}
                color="white"
                bg={selectedIndex === index ? "#f8991d" : "transparent"} // Highlight selected item
              >
                {player.longName}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default SearchInput;
