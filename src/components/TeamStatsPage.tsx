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
import { useTeamStore } from "../stores/useTeamStore";

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
          orderSequence: ["desc", "asc", ""],
          targets: Array.from({ length: 10 }, (_, i) => i + 2),
        },
        { targets: 0, width: "280px" },
      ],
      rowCallback: (row, _data, index) => {
        $(row).css("background-color", index % 2 === 0 ? "#2b2b2b" : "#202020");
      },
      destroy: true,
    });

    // Add vertical column highlight
    $("#teamStatsTable thead th")
      .on("mouseover", function () {
        const columnIndex = $(this).index();
        $(`#teamStatsTable tbody tr`).each(function () {
          $(this).find("td").eq(columnIndex).addClass("highlight-column");
        });
      })
      .on("mouseout", function () {
        const columnIndex = $(this).index();
        $(`#teamStatsTable tbody tr`).each(function () {
          $(this).find("td").eq(columnIndex).removeClass("highlight-column");
        });
      });

    return () => {
      table.destroy();
      $("#teamStatsTable thead th").off("mouseover mouseout");
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
    fontSize: useBreakpointValue({ base: "11px", md: "14px" }),
    lineHeight: "var(--chakra-lineHeights-4)",
    borderBottom: "1px solid var(--chakra-colors-gray-700)",
  };

  // Add the sticky header CSS
  const stickyHeaderStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    zIndex: 2,
    backgroundColor: "#1f1f1f", // Matches your background color
    color: "#f9f9f9", // Matches the header text color
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", // Optional: Adds shadow to the sticky header
  };

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
        padding={{ base: 0, md: "5px" }}
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
              <th
                style={{
                  ...thStyle,
                  ...stickyHeaderStyle,
                  position: "sticky", // Make the header sticky
                  left: 0, // Stick the first header on the left
                  zIndex: 3, // Ensure it's above other rows
                }}
              >
                Player
              </th>
              <th
                style={{
                  ...thStyle,
                  position: "sticky", // Sticky for 'Pos' column
                  left: 0, // Ensure it sticks alongside 'Player'
                  zIndex: 2, // Slightly lower z-index than "Player"
                }}
              >
                Pos
              </th>
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
            {playersWithRatings.map((player, index) => {
              const rowColor = index % 2 === 0 ? "#2b2b2b" : "#202020"; // Alternating background colors
              return (
                <tr
                  key={player.playerID}
                  style={{
                    backgroundColor: rowColor, // Apply alternating row color
                  }}
                >
                  <td
                    style={{
                      ...cellStyle,
                      position: "sticky",
                      left: 0,
                      zIndex: 1, // Keeps the player name above other rows
                      fontWeight: "500",
                      fontSize: useBreakpointValue({
                        base: "12px",
                        md: "13px",
                      }),
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      backgroundColor: "inherit", // Inherit background color from row
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
                      base: player.shortName,
                      md: player.shortName,
                      lg: player.longName,
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
              );
            })}
          </tbody>
        </table>
      </Box>
    </>
  );
};

<style>{`
.highlight-column {
  background-color: #444 !important; /* Highlight color */
  font-weight: bold !important; /* Optional: Make text bold */
}

/* Mobile-specific adjustments */
@media (max-width: 500px) {
  table#teamStatsTable td {
    width: 155px !important;
  }
  span.dt-column-order {
    right: 0px!important;
  }
  th.dt-type-numeric.dt-orderable-asc.dt-orderable-desc {
    padding: 0px !important;
  }
  td.dt-type-numeric {
    padding: 0 !important;
  }
}

`}</style>;

export default TeamStatsPage;
