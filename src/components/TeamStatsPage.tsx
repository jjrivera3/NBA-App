import { Box, useBreakpointValue } from "@chakra-ui/react";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import $ from "jquery";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Utah_Jazz from "../assets/Utah_Jazz.png";
import nbaTeams from "../data/nbateams";
import useTeamColor from "../hooks/useTeamColor";
import useTeamInfo from "../hooks/useTeamInfo";
import TeamHeading from "./TeamHeading";
import { useTeamStore } from "../useTeamStore";

const TeamStatsPage = () => {
  const { teamAbv } = useParams<{ teamAbv: string }>();
  const lowercasedTeamAbv = teamAbv?.toLowerCase();
  const playersWithRatings = useTeamStore((state) => state.playersWithRatings);

  const selectedAbv = nbaTeams.find(
    (team) => team.info.abbrev.toLowerCase() === lowercasedTeamAbv
  );
  const teamId = selectedAbv ? selectedAbv.teamId : null;

  const teamColor = useTeamColor(teamId);
  const { data: teamInfo } = useTeamInfo(teamId, { schedules: "true" });

  const selectedTeam = Array.isArray(teamInfo?.body)
    ? teamInfo.body.find(
        (team: { teamID: string | null }) => team.teamID === teamId
      )
    : undefined;

  const espnLogo1 =
    selectedTeam?.teamID === "29" ? Utah_Jazz : selectedTeam?.espnLogo1;
  const defaultColor = "#000000";

  const showImage = useBreakpointValue({ base: false, md: false, lg: true });

  useEffect(() => {
    const table = $("#teamStatsTable").DataTable({
      paging: false,
      searching: false,
      lengthChange: false,
      order: [[0, "asc"]],
      info: false,
      columnDefs: [
        {
          orderSequence: ["desc", "asc"],
          targets: Array.from({ length: 10 }, (_, i) => i + 2),
        },
        { targets: 0, width: "280px" },
      ],
      rowCallback: (row, _data, index) => {
        $(row).css("background-color", index % 2 === 0 ? "#2b2b2b" : "#202020");
        $(row)
          .find("td")
          .not(":first")
          .each((_, td) => {
            $(td).addClass("custom-td-class");
          });
      },
      destroy: true,
    });

    return () => {
      table.destroy();
    };
  }, [playersWithRatings]);

  const thStyle: React.CSSProperties = {
    fontFamily: "var(--chakra-fonts-heading)",
    fontWeight: "var(--chakra-fontWeights-bold)",
    textTransform: "uppercase",
    letterSpacing: "var(--chakra-letterSpacings-wider)",
    textAlign: "start",
    padding: "var(--chakra-space-1) var(--chakra-space-4)",
    lineHeight: "var(--chakra-lineHeights-4)",
    fontSize: "var(--chakra-fontSizes-xs)",
    color: "var(--chakra-colors-gray-400)",
    borderBottom: "1px solid var(--chakra-colors-gray-700)",
  };

  const cellStyle: React.CSSProperties = {
    textAlign: "start",
    padding: "var(--chakra-space-2) var(--chakra-space-4)",
    fontSize: "var(--chakra-fontSizes-sm)",
    lineHeight: "var(--chakra-lineHeights-4)",
    borderBottom: "1px solid var(--chakra-colors-gray-700)",
  };

  console.log(playersWithRatings);

  return (
    <>
      <Box pt={7}>
        <TeamHeading
          teamCity={selectedTeam?.teamCity}
          teamName={selectedTeam?.teamName}
          conference={selectedTeam?.conference}
          espnLogo1={espnLogo1}
          wins={selectedTeam?.wins}
          loss={selectedTeam?.loss}
          firstColor={teamColor || defaultColor}
          teamAbv={teamAbv ?? ""}
        />
      </Box>

      <Box
        overflowX="auto"
        background="#26262640"
        padding="5px"
        position="relative"
        maxWidth="100%" // Ensure the box fits within the screen
      >
        <table
          id="teamStatsTable"
          className="table table-striped table-bordered"
          style={{
            minWidth: "1000px",
            marginTop: "10px",
            borderCollapse: "collapse",
          }}
        >
          <thead style={{ backgroundColor: "#1f1f1f", color: "#f9f9f9" }}>
            <tr>
              <th style={thStyle}>Player</th>
              <th style={thStyle}>Pos</th>
              <th style={thStyle}>GP</th>
              <th style={thStyle}>MIN</th>
              <th style={thStyle}>PTS</th>
              <th style={thStyle}>REB</th>
              <th style={thStyle}>AST</th>
              <th style={thStyle}>STL</th>
              <th style={thStyle}>BLK</th>
              <th style={thStyle}>FG%</th>
              <th style={thStyle}>FGM</th>
              <th style={thStyle}>FGA</th>
              <th style={thStyle}>3P%</th>
              <th style={thStyle}>3PM</th>
              <th style={thStyle}>3PA</th>
              <th style={thStyle}>FT%</th>
            </tr>
          </thead>
          <tbody>
            {playersWithRatings.map((player) => (
              <tr key={player.playerID}>
                <td
                  style={{
                    ...cellStyle,
                    fontWeight: "500",
                    fontSize: useBreakpointValue({ base: "12px", md: "13px" }),
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  {showImage && (
                    <img
                      src={player.nbaComHeadshot}
                      alt={player.longName || "Player Image"}
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  {useBreakpointValue({
                    base: player.shortName, // Display shortName on mobile
                    md: player.shortName, // Display shortName on mobile
                    lg: player.longName, // Display longName on medium screens and up
                  })}
                </td>

                <td style={cellStyle}>{player.pos}</td>
                <td style={cellStyle}>{player.stats?.gamesPlayed || "-"}</td>
                <td style={cellStyle}>{player.stats?.mins || "-"}</td>
                <td style={cellStyle}>{player.stats?.pts || "-"}</td>
                <td style={cellStyle}>{player.stats?.reb || "-"}</td>
                <td style={cellStyle}>{player.stats?.ast || "-"}</td>
                <td style={cellStyle}>{player.stats?.stl || "-"}</td>
                <td style={cellStyle}>{player.stats?.blk || "-"}</td>
                <td style={cellStyle}>{player.stats?.fgp || "-"}</td>
                <td style={cellStyle}>{player.stats?.fgm || "-"}</td>
                <td style={cellStyle}>{player.stats?.fga || "-"}</td>
                <td style={cellStyle}>{player.stats?.tptfgp || "-"}</td>
                <td style={cellStyle}>{player.stats?.tptfgm || "-"}</td>
                <td style={cellStyle}>{player.stats?.tptfga || "-"}</td>
                <td style={cellStyle}>{player.stats?.ftp || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <style>{`
          .highlight {
            background-color: #444 !important;
            font-weight: bold !important;
          }
          .highlight-column {
            background-color: #444 !important;
            font-weight: bold !important;
          }
          .selected-row {
            background-color: #333 !important;
            font-weight: bold !important;
          }
          table.table-striped tbody tr:nth-of-type(odd) {
            background-color: #2b2b2b;
          }
          table.table-striped tbody tr:nth-of-type(even) {
            background-color: #202020;
          }
          span.dt-column-order {
            display: none;
          } 
          .custom-td-class {
            font-weight: normal;
            text-align: center;
            padding: 5px;
          }
          table.table.dataTable.table-striped>tbody>tr:nth-of-type(2n+1)>* {
            box-shadow: none;
          }
          table.table-striped tbody tr:hover {
            background-color: #444 !important; /* Highlight color */
            font-weight: bold !important; /* Optional: Make text bold */
            cursor: pointer; /* Optional: Change cursor to pointer */
}
          /* Mobile-specific adjustments */
          @media (max-width: 500px) {
            table#teamStatsTable td {
              width: 155px !important;
            }
          }

        
        
        `}</style>
      </Box>
    </>
  );
};

export default TeamStatsPage;
