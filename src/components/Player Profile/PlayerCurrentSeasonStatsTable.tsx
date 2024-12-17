import { useEffect } from "react";
import $ from "jquery";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5";
import "datatables.net-select";
import { Box, Text } from "@chakra-ui/react";
import { lighten } from "polished";
import { usePlayerStore } from "../../usePlayerStore";

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

const PlayerCurrentSeasonStatsTable = ({
  stats,
  nbateams,
}: StatsTableProps) => {
  const player = usePlayerStore((state) => state.player);

  useEffect(() => {
    const table = $("#statsTable").DataTable({
      paging: false,
      searching: false,
      lengthChange: false,
      order: [[0, "asc"]],
      info: false,

      columnDefs: statKeys.map((_, index) => ({
        orderSequence: ["desc", "asc"],
        targets: index + 2,
      })),
      select: true,
      rowCallback: function (row, _data, index) {
        $(row).css("background-color", index % 2 === 0 ? "#2b2b2b" : "#202020");
      },
      destroy: true,
    });

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
  }, [stats]);

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
      <Text
        fontSize="xl"
        fontWeight={500}
        mb="2"
        textAlign="left"
        color="gray.200"
      >
        2024-25 Regular Season
      </Text>
      <Box overflowX="auto" background="#26262640" padding="5px">
        <table
          id="playerStatsTable"
          className="table table-striped table-bordered"
          style={{
            minWidth: "100%",
            marginTop: "10px",
            borderCollapse: "collapse",
          }}
        >
          <thead style={{ backgroundColor: "#1f1f1f", color: "#f9f9f9" }}>
            <tr>
              <th style={thStyle}>TEAM</th>
              <th style={thStyle}>GP</th>
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
            </tr>
          </thead>
          <tbody>
            {player?.stats && (
              <tr>
                <td
                  className="team-cell2"
                  style={{
                    ...cellStyle,
                    whiteSpace: "nowrap",
                  }}
                >
                  {(() => {
                    const abbreviationMap: Record<string, string> = {
                      GS: "GSW",
                      PHO: "PHX",
                      SA: "SAS",
                    };

                    const adjustedTeamAbbreviation =
                      abbreviationMap[player?.team] || player?.team;

                    const teamData = nbateams.find(
                      (team) => team.info.abbrev === adjustedTeamAbbreviation
                    );

                    const defaultColor = "#cccccc"; // Fallback color
                    const primaryColor =
                      teamData?.info.colors[0] || defaultColor;
                    const teamColor = lighten(
                      teamData?.light || 0.2,
                      primaryColor
                    );

                    return (
                      <span style={{ color: teamColor, fontWeight: "bold" }}>
                        {player?.rating?.team || "N/A"}
                      </span>
                    );
                  })()}
                </td>

                <style>{`
  .team-cell2 {
    min-width: 215px!important;
    width: 215px!important;
  }
`}</style>

                <td style={cellStyle}>{player.stats.gamesPlayed}</td>
                <td style={cellStyle}>{player.stats.mins}</td>
                <td style={cellStyle}>{player.stats.pts}</td>
                <td style={cellStyle}>{player.stats.reb}</td>
                <td style={cellStyle}>{player.stats.ast}</td>
                <td style={cellStyle}>{player.stats.stl}</td>
                <td style={cellStyle}>{player.stats.blk}</td>
                <td style={cellStyle}>{player.stats.fgm}</td>
                <td style={cellStyle}>{player.stats.fga}</td>
                <td style={cellStyle}>{player.stats.fgp}</td>
                <td style={cellStyle}>{player.stats.tptfgm}</td>
                <td style={cellStyle}>{player.stats.tptfga}</td>
                <td style={cellStyle}>{player.stats.tptfgp}</td>
                <td style={cellStyle}>{player.stats.ftm}</td>
                <td style={cellStyle}>{player.stats.fta}</td>
                <td style={cellStyle}>{player.stats.ftp}</td>
                <td style={cellStyle}>{player.stats.OffReb}</td>
                <td style={cellStyle}>{player.stats.DefReb}</td>
                <td style={cellStyle}>{player.stats.TOV}</td>
              </tr>
            )}
          </tbody>
        </table>
      </Box>
    </>
  );
};

export default PlayerCurrentSeasonStatsTable;
