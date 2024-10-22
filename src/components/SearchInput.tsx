import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useTeamInfo from "../hooks/useTeamInfo";
import { usePlayerStore } from "../usePlayerStore"; // Import the player store
import { usePlayerAttributesStore } from "../usePlayerAttributesStore"; // Import the attributes store
import nbaTeams from "../data/nbateams";
import Player from "../entities/Player";

interface Team {
  teamAbv: string;
  teamCity: string;
  teamName: string;
  currentStreak: {
    length: string;
    result: string;
  };
  loss: string;
  ppg: string;
  Roster: Record<string, PlayerInfo>;
}

interface PlayerInfo {
  teamName: any;
  rating: any;
  college: any;
  playerID: string;
  longName: string;
  team: string;
  bRefID: string;
  espnName: string;
  espnID?: string;
  exp: string;
  bDay?: string;
  height?: string;
  weight?: string;
  pos?: string;
  jerseyNum?: string;
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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const { data: teamsData, isError } = useTeamInfo();
  const setPlayerData = usePlayerStore((state) => state.setPlayerData);
  const setPlayerRating = usePlayerAttributesStore(
    (state) => state.setPlayerRating
  ); // Get setPlayerRating from the store

  useEffect(() => {
    if (teamsData?.body && Array.isArray(teamsData.body)) {
      const teams = teamsData.body as Team[];

      const allPlayers: Player[] = teams.flatMap((team) => {
        const teamAbbreviation = team.teamAbv;

        return Object.values(team.Roster).map((player) => ({
          playerID: player.playerID,
          longName: player.longName,
          team: teamAbbreviation,
          bRefID: player.bRefID,
          espnName: player.espnName,
          espnID: player.espnID,
          exp: player.exp,
          bDay: player.bDay,
          height: player.height,
          weight: player.weight,
          pos: player.pos,
          jerseyNum: player.jerseyNum,
          college: player.college,
          stats: { pts: "0", reb: "0", ast: "0" }, // Default stats
          teamId: "", // Set this to a valid value if available
          name: player.longName, // Set this to the player's name or relevant value
          rating: player.rating || {}, // Initialize rating, set to empty object if not available
          espnHeadshot: `https://a.espncdn.com/i/headshots/nba/players/full/${player.espnID}.png`, // Default headshot URL
        }));
      });

      setPlayers(allPlayers);
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
      event.preventDefault();
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
    playerID: string,
    teamAbbreviation: string
  ) => {
    setSearchText(""); // Clear the search bar
    setFilteredPlayers([]);
    setSelectedIndex(null); // Reset the selected index

    // Convert "gs" to "gsw" for the Golden State Warriors
    const adjustedTeamAbbreviation =
      teamAbbreviation.toLowerCase() === "gs" ? "gsw" : teamAbbreviation;

    if (teamsData?.body) {
      const playerInfo = Object.values(teamsData.body as unknown as Team[])
        .flatMap((team) => Object.values(team.Roster))
        .find((p: PlayerInfo) => p.playerID === playerID);

      if (playerInfo) {
        // Find the matching team in nbaTeams.ts
        const selectedTeam = nbaTeams.find(
          (team) =>
            team.info.abbrev.toLowerCase() ===
            adjustedTeamAbbreviation.toLowerCase()
        );

        if (selectedTeam) {
          const firstTeamColor = selectedTeam.info.colors[0] || "#000000"; // Default to black if no color is found
          const teamLogo = selectedTeam.info.logoImage || "defaultLogo.png"; // Fallback to default logo

          const espnHeadshot = `https://a.espncdn.com/i/headshots/nba/players/full/${playerInfo.espnID}.png`; // Example ESPN headshot URL

          const player: Player = {
            playerID: playerInfo.playerID,
            longName: playerInfo.longName,
            team: playerInfo.team,
            bRefID: playerInfo.bRefID,
            espnName: playerInfo.espnName,
            espnID: playerInfo.espnID,
            exp: playerInfo.exp,
            bDay: playerInfo.bDay,
            height: playerInfo.height,
            weight: playerInfo.weight,
            pos: playerInfo.pos,
            jerseyNum: playerInfo.jerseyNum,
            rating: playerInfo.rating,
            college: playerInfo.college,
            espnHeadshot: espnHeadshot,
            stats: { pts: "0", reb: "0", ast: "0" }, // Default stats
            teamId: "",
            name: "",
          };

          console.log(selectedTeam);

          // Update usePlayerStore with player data and team logo
          setPlayerData({
            player,
            firstColor: firstTeamColor,
            teamID: selectedTeam.teamId || "unknown",
            espnLogo1: teamLogo,
            teamCity: selectedTeam.info.city || "Unknown City",
            teamName: selectedTeam.name,
          });

          if (player.rating) {
            setPlayerRating(player.rating);
          }

          const formattedPlayerName = formatPlayerNameForUrl(playerName);
          const formattedTeam = adjustedTeamAbbreviation.toLowerCase();
          navigate(`/${formattedTeam}/${formattedPlayerName}`);
          onSearch(playerName);
        } else {
          console.error(
            "Team not found for abbreviation:",
            adjustedTeamAbbreviation
          );
        }
      }
    }
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
                bg={selectedIndex === index ? "#f8991d" : "transparent"}
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
