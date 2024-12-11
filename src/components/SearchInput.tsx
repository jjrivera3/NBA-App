import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Image,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import usePlayerSearch from "../hooks/usePlayerSearch";
import Player from "../entities/Player";
import { normalizeName } from "../utils/normalizeName";
import ratings from "../data/ratings";

interface SearchInputProps {
  onSearchClose: () => void;
  onTeamSelect: (teamId: string | null, teamAbv: string) => void; // Add onTeamSelect prop
}
const SearchInput: React.FC<SearchInputProps> = ({
  onSearchClose,
  onTeamSelect,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const navigate = useNavigate();
  const { players, handleSelectPlayer, isError } = usePlayerSearch();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setSearchText(text);
    setSelectedIndex(null);

    if (text) {
      const normalizedSearchText = normalizeName(text);
      const filtered = players.filter((player) =>
        normalizeName(player.longName).includes(normalizedSearchText)
      );
      setFilteredPlayers(filtered);
    } else {
      setFilteredPlayers([]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      setSelectedIndex((prev) =>
        prev === null ? 0 : prev < filteredPlayers.length - 1 ? prev + 1 : prev
      );
    } else if (event.key === "ArrowUp") {
      setSelectedIndex((prev) =>
        prev === null || prev === 0 ? null : prev - 1
      );
    } else if (event.key === "Enter" && selectedIndex !== null) {
      const selectedPlayer = filteredPlayers[selectedIndex];

      if (selectedPlayer) {
        const playerRating = ratings.find(
          (rating) =>
            normalizeName(rating.name) ===
            normalizeName(selectedPlayer.longName)
        );

        const updatedPlayer = {
          ...selectedPlayer,
          rating: playerRating || null,
        };

        // Reset selected team
        onTeamSelect(null, "");

        handleSelectPlayer(
          updatedPlayer.longName,
          updatedPlayer.playerID,
          updatedPlayer.team,
          navigate
        );

        setSearchText("");
        setFilteredPlayers([]);
        onSearchClose();
      }
    }
  };

  const handlePlayerClick = (player: Player) => {
    const playerRating = ratings.find(
      (rating) => normalizeName(rating.name) === normalizeName(player.longName)
    );

    const updatedPlayer = {
      ...player,
      rating: playerRating || null,
    };

    // Reset selected team
    onTeamSelect(null, "");

    handleSelectPlayer(
      updatedPlayer.longName,
      updatedPlayer.playerID,
      updatedPlayer.team,
      navigate
    );

    setSearchText("");
    setFilteredPlayers([]);
    onSearchClose();
  };

  if (isError) return <p>Error fetching rosters.</p>;

  return (
    <Box position="relative">
      <form
        onSubmit={(event) => {
          event.preventDefault();
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
            onKeyDown={handleKeyDown}
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
          zIndex={999999}
          mt={2}
          bgColor="rgba(0, 0, 0, 0.9)"
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
                onClick={() => handlePlayerClick(player)}
                px={3}
                py={2}
                color="white"
                bg={selectedIndex === index ? "#f8991d" : "transparent"}
              >
                <HStack spacing={2}>
                  <Image
                    src={player.espnHeadshot}
                    alt={player.longName}
                    boxSize="30px"
                    borderRadius="full"
                    objectFit="cover"
                  />
                  <Text>{player.longName}</Text>
                </HStack>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default SearchInput;
