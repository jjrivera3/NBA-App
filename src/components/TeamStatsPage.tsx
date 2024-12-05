import { Box } from "@chakra-ui/react";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import $ from "jquery";
import { lighten } from "polished";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Utah_Jazz from "../assets/Utah_Jazz.png";
import nbaTeams from "../data/nbateams";
import useTeamColor from "../hooks/useTeamColor";
import useTeamInfo from "../hooks/useTeamInfo";
import { useTeamStore } from "../useTeamStore";
import TeamHeading from "./TeamHeading";

const TeamStatsPage = () => {
  const { teamAbv } = useParams<{ teamAbv: string }>();
  const lowercasedTeamAbv = teamAbv?.toLowerCase();
  const playersWithRatings = useTeamStore((state) => state.playersWithRatings);
  const selectedAbv = nbaTeams.find(
    (team) => team.info.abbrev.toLowerCase() === lowercasedTeamAbv
  );
  const teamId = selectedAbv ? selectedAbv.teamId : null;

  const teamColor = useTeamColor(teamId);
  const { data: teamInfo } = useTeamInfo(teamId, {
    schedules: "true",
  });

  const selectedTeam = Array.isArray(teamInfo?.body)
    ? teamInfo.body.find(
        (team: { teamID: string | null }) => team.teamID === teamId
      )
    : undefined;

  const espnLogo1 =
    selectedTeam?.teamID === "29" ? Utah_Jazz : selectedTeam?.espnLogo1;
  const defaultColor = "#000000";

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
          targets: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        },
      ],

      rowCallback: function (row, _data, index) {
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
    textAlign: "start" as "left",
    padding: "var(--chakra-space-2) var(--chakra-space-4)",
    fontSize: "var(--chakra-fontSizes-sm)",
    lineHeight: "var(--chakra-lineHeights-4)",
    borderBottom: "1px solid var(--chakra-colors-gray-700)",
  };

  return (
    <>
      <Box pt={7}>
        <TeamHeading
          teamCity={selectedTeam.teamCity}
          teamName={selectedTeam.teamName}
          conference={selectedTeam.conference}
          espnLogo1={espnLogo1}
          wins={selectedTeam.wins}
          loss={selectedTeam.loss}
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
              <th style={thStyle}>Position</th>
              <th style={thStyle}>GP</th>
              <th style={thStyle}>PTS</th>
              <th style={thStyle}>REB</th>
              <th style={thStyle}>AST</th>
              <th style={thStyle}>STL</th>
              <th style={thStyle}>BLK</th>
              <th style={thStyle}>FG%</th>
              <th style={thStyle}>3P%</th>
              <th style={thStyle}>FT%</th>
              <th style={thStyle}>MIN</th>
            </tr>
          </thead>
          <tbody>
            {playersWithRatings.map((player) => {
              const teamColor = lighten(0.1, "#0077ff"); // Example: Adjust with team-specific logic
              return (
                <tr key={player.playerID}>
                  <td
                    className="player-cell"
                    style={{
                      ...cellStyle,
                      fontWeight: "bold",
                      color: teamColor,
                    }}
                  >
                    {player.longName}
                  </td>
                  <td className="position-cell" style={cellStyle}>
                    {player.pos}
                  </td>
                  <td className="gp-cell" style={cellStyle}>
                    {player.stats?.gamesPlayed || "-"}
                  </td>
                  <td className="pts-cell" style={cellStyle}>
                    {player.stats?.pts || "-"}
                  </td>
                  <td className="reb-cell" style={cellStyle}>
                    {player.stats?.reb || "-"}
                  </td>
                  <td className="ast-cell" style={cellStyle}>
                    {player.stats?.ast || "-"}
                  </td>
                  <td className="stl-cell" style={cellStyle}>
                    {player.stats?.stl || "-"}
                  </td>
                  <td className="blk-cell" style={cellStyle}>
                    {player.stats?.blk || "-"}
                  </td>
                  <td className="fgp-cell" style={cellStyle}>
                    {player.stats?.fgp || "-"}
                  </td>
                  <td className="tptfgp-cell" style={cellStyle}>
                    {player.stats?.tptfgp || "-"}
                  </td>
                  <td className="ftp-cell" style={cellStyle}>
                    {player.stats?.ftp || "-"}
                  </td>
                  <td className="mins-cell" style={cellStyle}>
                    {player.stats?.mins || "-"}
                  </td>
                </tr>
              );
            })}
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
          table.dataTable tbody > tr.selected > * {
            box-shadow: inset 0 0 0 9999px #444;
          }
        `}</style>
      </Box>
    </>
  );
};

export default TeamStatsPage;
