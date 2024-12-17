import { useEffect } from "react";
import $ from "jquery";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5";
import "datatables.net-select";
import { Box, Text } from "@chakra-ui/react";
import { lighten } from "polished";
import { Stat } from "../../entities/Stats";
import Team from "../../entities/Team";

interface StatsTableProps {
  stats: Stat[];
  nbateams: Team[];
}

type StatKeys = keyof Stat;

const statKeys: StatKeys[] = [
  "gamesPlayed",
  "gamesStarted",
  "minutesPerGame",
  "pointsPerGame",
  "totalReboundsPerGame",
  "assistsPerGame",
  "stealsPerGame",
  "blocksPerGame",
  "fieldGoalsMadePerGame",
  "fieldGoalAttemptsPerGame",
  "fieldGoalPercentage",
  "threePointFieldGoalsMadePerGame",
  "threePointFieldGoalAttemptsPerGame",
  "threePointFieldGoalPercentage",
  "freeThrowsMadePerGame",
  "freeThrowAttemptsPerGame",
  "freeThrowPercentage",
  "offensiveReboundsPerGame",
  "defensiveReboundsPerGame",
  "turnoversPerGame",
  "personalFoulsPerGame",
];

const StatsTable = ({ stats, nbateams }: StatsTableProps) => {
  useEffect(() => {
    const table = $("#statsTable").DataTable({
      paging: false,
      searching: false,
      lengthChange: false,
      order: [[0, "asc"]],
      info: false,
      //@ts-ignore
      columnDefs: statKeys.map((_, index) => ({
        orderSequence: ["desc", "asc", null],
        targets: index + 2,
      })),
      select: true,
      rowCallback: function (row, _data, index) {
        // Set the background color for alternate rows (optional)
        $(row).css("background-color", index % 2 === 0 ? "#2b2b2b" : "#202020");

        const dataArray = _data as any[];

        // Access the second element safely
        const teamAbbrev = dataArray[1]; // The second column in the row is the team abbreviation

        const teamData = nbateams.find((team) => {
          if (
            (teamAbbrev === "PHO" && team.info.abbrev === "PHX") ||
            (teamAbbrev === "BRK" && team.info.abbrev === "BKN")
          ) {
            return true;
          }
          return team.info.abbrev === teamAbbrev;
        });

        const primaryColor =
          teamAbbrev === "SEA"
            ? "#ffc200"
            : teamAbbrev === "CHO"
            ? lighten(0.2, "#00788C") // Blue color for "CHA"
            : teamData?.info.colors[0] || "#cccccc";
        const teamColor = lighten(teamData?.light || 0.2, primaryColor);

        // Apply teamColor to the text color (font color) of the first and second td (Season and Team)
        $(row).find("td").eq(0).css("color", teamColor); // First td (Season)
        $(row).find("td").eq(1).css("color", teamColor); // Second td (Team)
      },
      destroy: true, // To destroy the table and reinitialize when stats change
    });

    // Reset table content and add new rows when stats change
    const updateTable = () => {
      table.clear(); // Clear existing data
      table.rows.add(
        stats.slice(0, -1).map((row) => {
          const displayTeamAbbrev =
            row.team === "N/A"
              ? ""
              : row.team === "PHO"
              ? "PHO"
              : row.team === "BRK"
              ? "BKN"
              : row.team === "CHO"
              ? "CHA"
              : row.team;

          return [
            row.season,
            displayTeamAbbrev,
            ...statKeys.map((key) =>
              row.season === "Career" && key === "gamesPlayed"
                ? totalGamesPlayed
                : row.season === "Career" && key === "gamesStarted"
                ? totalGamesStarted
                : row[key]
            ),
          ];
        })
      );
      table.draw(); // Redraw the table with new data
    };

    updateTable(); // Initial update

    $("#statsTable tbody").on("click", "tr", function () {
      $(this).toggleClass("selected-row"); // Toggle selected class
    });

    $("#statsTable tbody")
      .on("mouseover", "tr", function () {
        $(this).addClass("highlight");
      })
      .on("mouseout", "tr", function () {
        $(this).removeClass("highlight");
      });

    $("#statsTable th")
      .on("mouseover", function () {
        const columnIndex = $(this).index();
        $("#statsTable tbody tr").each(function () {
          $(this).find("td").eq(columnIndex).addClass("highlight-column");
        });
      })
      .on("mouseout", function () {
        $("#statsTable tbody tr").find("td").removeClass("highlight-column");
      });

    return () => {
      table.destroy();
    };
  }, [stats, nbateams]); // Re-run effect on stats or nbateams change

  const totalGamesPlayed = stats.reduce((total, stat) => {
    return stat.season !== "Career" ? total + Number(stat.gamesPlayed) : total;
  }, 0);

  const totalGamesStarted = stats.reduce((total, stat) => {
    return stat.season !== "Career" ? total + Number(stat.gamesStarted) : total;
  }, 0);

  const lastStat = stats[stats.length - 1];

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
    whiteSpace: "nowrap", // Prevent text from wrapping
  };

  return (
    <>
      <Text
        fontSize="xl"
        fontWeight={500}
        mb="2"
        textAlign="left"
        color="gray.200"
      >
        Career Stats
      </Text>
      <Box overflowX="auto" background="#26262640" padding="5px">
        <table
          id="statsTable"
          className="table table-striped table-bordered"
          style={{
            minWidth: "1000px",
            marginTop: "5px",
            borderCollapse: "collapse",
          }}
        >
          <thead style={{ backgroundColor: "#1f1f1f", color: "#f9f9f9" }}>
            <tr>
              <th style={thStyle}>Season</th>
              <th style={thStyle}>TM</th>
              <th style={thStyle}>GP</th>
              <th style={thStyle}>GS</th>
              <th style={thStyle}>MIN</th>
              <th style={thStyle}>PTS</th>
              <th style={thStyle}>REB</th>
              <th style={thStyle}>AST</th>
              <th style={thStyle}>STL</th>
              <th style={thStyle}>BLK</th>
              <th style={thStyle}>FGM</th>
              <th style={thStyle}>FGA</th>
              <th style={thStyle}>FG%</th>
              <th style={thStyle}>3PM</th>
              <th style={thStyle}>3PA</th>
              <th style={thStyle}>3P%</th>
              <th style={thStyle}>FTM</th>
              <th style={thStyle}>FTA</th>
              <th style={thStyle}>FT%</th>
              <th style={thStyle}>OREB</th>
              <th style={thStyle}>DREB</th>
              <th style={thStyle}>TOV</th>
              <th style={thStyle}>PF</th>
            </tr>
          </thead>

          <tbody>{/* Rows will be inserted by DataTable */}</tbody>
        </table>

        <table
          id="lastStatTable"
          className="table table-striped table-bordered"
          style={{
            minWidth: "1000px",
            marginTop: "5px",
            borderCollapse: "collapse",
          }}
        >
          <thead
            style={{ backgroundColor: "#1f1f1f", color: "#f9f9f9" }}
          ></thead>
          <tbody>
            <tr>
              <td
                className="season-cell"
                style={{
                  ...cellStyle,
                  minWidth: "140px",
                  width: "140px",
                  maxWidth: "140px",
                  fontWeight: "bold", // Make the font bold
                }}
              >
                {lastStat && lastStat.season
                  ? lastStat.season === "N/A"
                    ? "Rookie Season"
                    : lastStat.season
                  : "Rookie Season"}
              </td>
              <td className="team-cell team-cell-custom" style={cellStyle}>
                {lastStat.team === "N/A" ? "" : lastStat.team}
              </td>
              {statKeys.map((key, idx) => (
                <td key={idx} className="stats-cell" style={cellStyle}>
                  {lastStat.season === "Career" && key === "gamesPlayed"
                    ? totalGamesPlayed
                    : lastStat.season === "Career" && key === "gamesStarted"
                    ? totalGamesStarted
                    : lastStat[key]}
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <style>{`
        .highlight {
          background-color: #444 !important;
          font-weight: 700 !important;
        }
        .highlight-column {
          background-color: #444 !important;
          font-weight: 700 !important;
        }
        .selected-row {
          font-weight: 700 !important;
        }
        table.table.dataTable.table-striped > tbody > tr:nth-of-type(2n+1).selected > *,
        table.table.dataTable > tbody > tr.selected > * {
          box-shadow: inset 0 0 0 9999px #444;
          font-weight: 700 !important;
        }
 

        td.stats-cell {
          font-weight: bold;
                    text-align:center;
          padding: var(--chakra-space-1) var(--chakra-space-4)!important;
        }

        table.dataTable thead > tr > th.dt-orderable-asc span.dt-column-order,
        table.dataTable thead > tr > th.dt-orderable-desc span.dt-column-order {
          right: 0px;
        }
        table td:first-child { 
          min-width: 140px;
          padding: 5px 15px;
          font-size: var(--chakra-fontSizes-sm);
          font-weight: bold;
          text-align:left;!important
        }
        table td:nth-child(2) { 
          font-weight: bold;
          text-align:left;!important
          padding-left:15px;!important
           min-width: 60px;
          width: 60px;
          max-width: 60px;
        }
        td {
          font-size: var(--chakra-fontSizes-sm);
          text-align:center;
          padding: var(--chakra-space-1) var(--chakra-space-4)!important;
                  min-width: 75px;
          width: 75px;
          max-width: 75px;
   
      }
        td.dt-type-numeric {
        text-align: left !important;

        }
  /* Mobile-specific adjustments */
  @media (max-width: 500px) {
           td.sorting_1  { 
      min-width: 115px!important;
    }
      td {
    font-size: 12px;
    padding: 0px;
    min-width: 65px;
}
    table td:first-child {

    font-size: 12px;
}
        }
      
      `}</style>
      </Box>
    </>
  );
};

export default StatsTable;
