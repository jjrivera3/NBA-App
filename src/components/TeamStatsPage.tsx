import { Box } from "@chakra-ui/react";
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

  console.log(selectedTeam);

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
        { targets: 1, width: "80px" }, // Position column width
      ],
      rowCallback: (row, _data, index) => {
        $(row).css("background-color", index % 2 === 0 ? "#2b2b2b" : "#202020");
      },
      destroy: true,
    });

    $("#teamStatsTable tbody").on("click", "tr", function () {
      const selectedData = table.row(this).data();
      console.log("Selected Row Data:", selectedData);
      $(this).toggleClass("selected-row");
    });

    $("#teamStatsTable tbody")
      .on("mouseover", "tr", function () {
        $(this).addClass("highlight");
      })
      .on("mouseout", "tr", function () {
        $(this).removeClass("highlight");
      });

    $("#teamStatsTable th")
      .on("mouseover", function () {
        const columnIndex = $(this).index();
        $("#teamStatsTable tbody tr").each(function () {
          $(this).find("td").eq(columnIndex).addClass("highlight-column");
        });
      })
      .on("mouseout", function () {
        $("#teamStatsTable tbody tr")
          .find("td")
          .removeClass("highlight-column");
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
      <Box overflowX="auto" background="#26262640" padding="5px">
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
              <th style={thStyle}>3P%</th>
              <th style={thStyle}>FT%</th>
            </tr>
          </thead>
          <tbody>
            {playersWithRatings.map((player) => (
              <tr key={player.playerID}>
                <td
                  style={{
                    ...cellStyle,
                    fontWeight: "bold",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <img
                    src={player.nbaComHeadshot}
                    alt={player.longName || "Player Image"}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  {player.longName}
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
                <td style={cellStyle}>{player.stats?.tptfgp || "-"}</td>
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
        `}</style>
      </Box>
    </>
  );
};

export default TeamStatsPage;
