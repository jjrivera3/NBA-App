import { useEffect } from "react";
import $ from "jquery";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5";
import "datatables.net-select";
import { Box, Text } from "@chakra-ui/react";
import { lighten } from "polished";

interface Stat {
  season: string;
  team: string;
  gamesPlayed: number;
  gamesStarted: number;
  minutesPerGame: number;
  pointsPerGame: number;
  reboundsPerGame: number;
  assistsPerGame: number;
  stealsPerGame: number;
  blocksPerGame: number;
  fieldGoalsMadePerGame: number;
  fieldGoalAttemptsPerGame: number;
  fieldGoalPercentage: number;
  threePointFieldGoalsMadePerGame: number;
  threePointFieldGoalAttemptsPerGame: number;
  threePointFieldGoalPercentage: number;
  freeThrowsMadePerGame: number;
  freeThrowAttemptsPerGame: number;
  freeThrowPercentage: number;
  offensiveReboundsPerGame: number;
  defensiveReboundsPerGame: number;
  turnoversPerGame: number;
  personalFoulsPerGame: number;
  totalReboundsPerGame: number;
}

interface Team {
  teamId: string;
  name: string;
  light: number;
  info: {
    abbrev: string;
    colors: string[];
    logoImage: string;
  };
}

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
      columnDefs: statKeys.map((_, index) => ({
        orderSequence: ["desc", "asc"],
        targets: index + 2, // Adjust based on your columns, starts from index 2 for GP
      })),
      select: true, // Enable row selection
      rowCallback: function (row, data, index) {
        $(row).css("background-color", index % 2 === 0 ? "#2b2b2b" : "#202020");
      },
      destroy: true,
    });

    // Row selection event
    $("#statsTable tbody").on("click", "tr", function () {
      const selectedData = table.row(this).data();
      console.log("Selected Row Data:", selectedData);
    });

    // Highlight row on mouse over
    $("#statsTable tbody")
      .on("mouseover", "tr", function () {
        $(this).addClass("highlight");
      })
      .on("mouseout", "tr", function () {
        $(this).removeClass("highlight");
      });

    // Highlight column on mouse over
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
  }, [stats]);

  const totalGamesPlayed = stats.reduce((total, stat) => {
    return stat.season !== "Career" ? total + Number(stat.gamesPlayed) : total;
  }, 0);

  const totalGamesStarted = stats.reduce((total, stat) => {
    return stat.season !== "Career" ? total + Number(stat.gamesStarted) : total;
  }, 0);

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
    <Box overflowX="auto" background="#26262640" padding="5px">
      <Text
        fontSize="2xl"
        fontWeight={500}
        mb="2"
        textAlign="left"
        color="gray.200"
      >
        Career Stats
      </Text>
      <table
        id="statsTable"
        className="table table-striped table-bordered"
        style={{
          minWidth: "1000px",
          marginTop: "10px",
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
        <tbody>
          {stats.map((row, index) => {
            const teamData = nbateams.find((team) => {
              if (
                (row.team === "PHO" && team.info.abbrev === "PHX") ||
                (row.team === "BRK" && team.info.abbrev === "BKN")
              ) {
                return true;
              }
              return team.info.abbrev === row.team;
            });

            const seattleColor = "#ffc200";
            const primaryColor =
              row.team === "SEA"
                ? seattleColor
                : teamData?.info.colors[0] || "#cccccc";
            const teamColor =
              row.team === "SEA"
                ? seattleColor
                : lighten(teamData?.light || 0.2, primaryColor);
            const displayTeamAbbrev =
              row.team === "N/A"
                ? ""
                : row.team === "PHO"
                ? "PHO"
                : row.team === "BRK"
                ? "BKN"
                : row.team;

            return (
              <tr key={index}>
                <td
                  style={{
                    ...cellStyle,
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    color: teamColor,
                  }}
                >
                  {row.season}
                </td>
                <td
                  style={{ ...cellStyle, fontWeight: "bold", color: teamColor }}
                >
                  {displayTeamAbbrev}
                </td>
                {statKeys.map((key, idx) => (
                  <td
                    key={idx}
                    style={{
                      ...cellStyle,
                    }}
                  >
                    {row.season === "Career" && key === "gamesPlayed"
                      ? totalGamesPlayed
                      : row.season === "Career" && key === "gamesStarted"
                      ? totalGamesStarted
                      : row[key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <style>{`
        .highlight {
          background-color: #444 !important;
        }
        .highlight-column {
          background-color: #444 !important;
        }
        span.dt-column-order {
          display: none;
        }
        table.table.dataTable.table-striped>tbody>tr:nth-of-type(2n+1).selected>*,
        table.table.dataTable>tbody>tr.selected>* {
          box-shadow: inset 0 0 0 9999px #444;
          box-shadow: inset 0 0 0 9999px #444;
        }
      `}</style>
    </Box>
  );
};

export default StatsTable;
