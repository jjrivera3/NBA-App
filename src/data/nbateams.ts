import Team from "../entities/Team";
import Utah_Jazz from "../assets/Utah_Jazz.png";

const generateLogoUrl = (teamId: string) => {
  return `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${teamId.toLowerCase()}.png&h=200&w=200`;
};

const nbaTeams: Team[] = [
  {
    teamId: "1",
    name: "Atlanta Hawks",
    light: 0,
    info: {
      abbrev: "ATL",
      colors: ["#E03A3E", "#C1D32F", "#26282A"],
      logoImage: generateLogoUrl("ATL"),
    },
  },
  {
    teamId: "2",
    name: "Boston Celtics",
    light: 0.2,
    info: {
      abbrev: "BOS",
      colors: ["#007A33", "#BA9653", "#000000"],
      logoImage: generateLogoUrl("BOS"),
    },
  },
  {
    teamId: "3",
    name: "Brooklyn Nets",
    light: 0,
    info: {
      abbrev: "BKN",
      colors: ["#E74D53"],
      logoImage: generateLogoUrl("BKN"),
    },
  },
  {
    teamId: "4",
    name: "Charlotte Hornets",
    light: 0.2,
    info: {
      abbrev: "CHA",
      colors: ["#00788C", "#1D1160", "#A1A1A4"],
      logoImage: generateLogoUrl("CHA"),
    },
  },
  {
    teamId: "5",
    name: "Chicago Bulls",
    light: 0.1,
    info: {
      abbrev: "CHI",
      colors: ["#CE1141", "#000000"],
      logoImage: generateLogoUrl("CHI"),
    },
  },
  {
    teamId: "6",
    name: "Cleveland Cavaliers",
    light: 0.2,
    info: {
      abbrev: "CLE",
      colors: ["#6F263D", "#FFB81C", "#041E42"],
      logoImage: generateLogoUrl("CLE"),
    },
  },
  {
    teamId: "7",
    name: "Dallas Mavericks",
    light: 0.3,
    info: {
      abbrev: "DAL",
      colors: ["#00538C", "#002B5C", "#26282A"],
      logoImage: generateLogoUrl("DAL"),
    },
  },
  {
    teamId: "8",
    name: "Denver Nuggets",
    light: 0.2,
    info: {
      abbrev: "DEN",
      colors: ["#8B2131", "#FEC524"],
      logoImage: generateLogoUrl("DEN"),
    },
  },
  {
    teamId: "9",
    name: "Detroit Pistons",
    light: 0.1,
    info: {
      abbrev: "DET",
      colors: ["#C8102E", "#1D428A", "#4d86c0"],
      logoImage: generateLogoUrl("DET"),
    },
  },
  {
    teamId: "10",
    name: "Golden State Warriors",
    light: 0.2,
    info: {
      abbrev: "GSW",
      colors: ["#1D428A", "#FFD100"],
      logoImage: generateLogoUrl("GSW"),
    },
  },
  {
    teamId: "11",
    name: "Houston Rockets",
    light: 0.1,
    info: {
      abbrev: "HOU",
      colors: ["#CE1141", "#000000", "#A1A1A4"],
      logoImage: generateLogoUrl("HOU"),
    },
  },
  {
    teamId: "12",
    name: "Indiana Pacers",
    light: 0.3,
    info: {
      abbrev: "IND",
      colors: ["#002D62", "#FDBB30", "#FF883E"],
      logoImage: generateLogoUrl("IND"),
    },
  },
  {
    teamId: "13",
    name: "LA Clippers",
    light: 0.3,
    info: {
      abbrev: "LAC",
      colors: ["#0033A0", "#FF6C00"],
      logoImage: generateLogoUrl("LAC"),
    },
  },
  {
    teamId: "14",
    name: "Los Angeles Lakers",
    light: 0.3,
    info: {
      abbrev: "LAL",
      colors: ["#552583", "#FDB927", "#000000"],
      logoImage: generateLogoUrl("LAL"),
    },
  },
  {
    teamId: "15",
    name: "Memphis Grizzlies",
    light: 0,
    info: {
      abbrev: "MEM",
      colors: ["#5D76A9", "#12173F", "#FDB927"],
      logoImage: generateLogoUrl("MEM"),
    },
  },
  {
    teamId: "16",
    name: "Miami Heat",
    light: 0.2,
    info: {
      abbrev: "MIA",
      colors: ["#98002E", "#000000", "#F9A01B"],
      logoImage: generateLogoUrl("MIA"),
    },
  },
  {
    teamId: "17",
    name: "Milwaukee Bucks",
    light: 0.2,
    info: {
      abbrev: "MIL",
      colors: ["#00471B", "#EEE1C6", "#0077C0"],
      logoImage: generateLogoUrl("MIL"),
    },
  },
  {
    teamId: "18",
    name: "Minnesota Timberwolves",
    light: 0.3,
    info: {
      abbrev: "MIN",
      colors: ["#236192", "#0C2340", "#78BE20"],
      logoImage: generateLogoUrl("MIN"),
    },
  },
  {
    teamId: "19",
    name: "New Orleans Pelicans",
    light: 0.2,
    info: {
      abbrev: "NOP",
      colors: ["#85714D", "#002B5C", "#E31837"],
      logoImage: generateLogoUrl("NO"),
    },
  },
  {
    teamId: "20",
    name: "New York Knicks",
    light: 0.3,
    info: {
      abbrev: "NYK",
      colors: ["#006BB6", "#F58426", "#000000"],
      logoImage: generateLogoUrl("NYK"),
    },
  },
  {
    teamId: "21",
    name: "Oklahoma City Thunder",
    light: 0.2,
    info: {
      abbrev: "OKC",
      colors: ["#007AC1", "#EF3B24", "#002D62"],
      logoImage: generateLogoUrl("OKC"),
    },
  },
  {
    teamId: "22",
    name: "Orlando Magic",
    light: 0.2,
    info: {
      abbrev: "ORL",
      colors: ["#0077C0", "#C4CED4", "#000000"],
      logoImage: generateLogoUrl("ORL"),
    },
  },
  {
    teamId: "23",
    name: "Philadelphia 76ers",
    light: 0.3,
    info: {
      abbrev: "PHI",
      colors: ["#006BB6", "#ED174C", "#005397"],
      logoImage: generateLogoUrl("PHI"),
    },
  },
  {
    teamId: "24",
    name: "Phoenix Suns",
    light: 0.1,
    info: {
      abbrev: "PHX",
      colors: ["#E56020", "#1D1160"],
      logoImage: generateLogoUrl("PHO"),
    },
  },
  {
    teamId: "25",
    name: "Portland Trail Blazers",
    light: 0,
    info: {
      abbrev: "POR",
      colors: ["#E03A3E", "#000000", "#A1A1A4"],
      logoImage: generateLogoUrl("POR"),
    },
  },
  {
    teamId: "26",
    name: "Sacramento Kings",
    light: 0.3,
    info: {
      abbrev: "SAC",
      colors: ["#5A2D81", "#63727A", "#63727A"],
      logoImage: generateLogoUrl("SAC"),
    },
  },
  {
    teamId: "27",
    name: "San Antonio Spurs",
    light: 0.2,
    info: {
      abbrev: "SAS",
      colors: ["#A1A1A4", "#C4CED4", "#000000"],
      logoImage: generateLogoUrl("SAS"),
    },
  },
  {
    teamId: "28",
    name: "Toronto Raptors",
    light: 0.1,
    info: {
      abbrev: "TOR",
      colors: ["#CE1141", "#000000", "#A1A1A4"],
      logoImage: generateLogoUrl("TOR"),
    },
  },
  {
    teamId: "29",
    name: "Utah Jazz",
    light: 0.4,
    info: {
      abbrev: "UTA",
      colors: ["#002B5C", "#00471B", "#8B2131"],
      logoImage: Utah_Jazz,
    },
  },
  {
    teamId: "30",
    name: "Washington Wizards",
    light: 0.3,
    info: {
      abbrev: "WAS",
      colors: ["#002B5C", "#E31837"],
      logoImage: generateLogoUrl("WAS"),
    },
  },
];

export default nbaTeams;
