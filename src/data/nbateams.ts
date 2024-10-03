import Team from "../entities/Team";

const generateLogoUrl = (teamId: string) => {
  return `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${teamId.toLowerCase()}.png&h=200&w=200`;
};

const nbaTeams: Team[] = [
  {
    teamId: "1",
    name: "Atlanta Hawks",
    info: {
      abbrev: "ATL",
      colors: ["#E03A3E", "#C1D32F", "#26282A"],
      logoImage: generateLogoUrl("ATL"),
    },
  },
  {
    teamId: "2",
    name: "Boston Celtics",
    info: {
      abbrev: "BOS",
      colors: ["#007A33", "#BA9653", "#000000"],
      logoImage: generateLogoUrl("BOS"),
    },
  },
  {
    teamId: "3",
    name: "Brooklyn Nets",
    info: {
      abbrev: "BKN",
      colors: ["#E74D53"],
      logoImage: generateLogoUrl("BKN"),
    },
  },
  {
    teamId: "4",
    name: "Charlotte Hornets",
    info: {
      abbrev: "CHA",
      colors: ["#00788C", "#1D1160", "#A1A1A4"],
      logoImage: generateLogoUrl("CHA"),
    },
  },
  {
    teamId: "5",
    name: "Chicago Bulls",
    info: {
      abbrev: "CHI",
      colors: ["#CE1141", "#000000"],
      logoImage: generateLogoUrl("CHI"),
    },
  },
  {
    teamId: "6",
    name: "Cleveland Cavaliers",
    info: {
      abbrev: "CLE",
      colors: ["#6F263D", "#FFB81C", "#041E42"],
      logoImage: generateLogoUrl("CLE"),
    },
  },
  {
    teamId: "7",
    name: "Dallas Mavericks",
    info: {
      abbrev: "DAL",
      colors: ["#00538C", "#002B5C", "#26282A"],
      logoImage: generateLogoUrl("DAL"),
    },
  },
  {
    teamId: "8",
    name: "Denver Nuggets",
    info: {
      abbrev: "DEN",
      colors: ["#8B2131", "#FEC524"],
      logoImage: generateLogoUrl("DEN"),
    },
  },
  {
    teamId: "9",
    name: "Detroit Pistons",
    info: {
      abbrev: "DET",
      colors: ["#C8102E", "#1D428A", "#4d86c0"],
      logoImage: generateLogoUrl("DET"),
    },
  },
  {
    teamId: "10",
    name: "Golden State Warriors",
    info: {
      abbrev: "GSW",
      colors: ["#1D428A", "#FFD100"],
      logoImage: generateLogoUrl("GSW"),
    },
  },
  {
    teamId: "11",
    name: "Houston Rockets",
    info: {
      abbrev: "HOU",
      colors: ["#CE1141", "#000000", "#A1A1A4"],
      logoImage: generateLogoUrl("HOU"),
    },
  },
  {
    teamId: "12",
    name: "Indiana Pacers",
    info: {
      abbrev: "IND",
      colors: ["#002D62", "#FDBB30", "#FF883E"],
      logoImage: generateLogoUrl("IND"),
    },
  },
  {
    teamId: "13",
    name: "LA Clippers",
    info: {
      abbrev: "LAC",
      colors: ["#0033A0", "#FF6C00"],
      logoImage: generateLogoUrl("LAC"),
    },
  },
  {
    teamId: "14",
    name: "Los Angeles Lakers",
    info: {
      abbrev: "LAL",
      colors: ["#552583", "#FDB927", "#000000"],
      logoImage: generateLogoUrl("LAL"),
    },
  },
  {
    teamId: "15",
    name: "Memphis Grizzlies",
    info: {
      abbrev: "MEM",
      colors: ["#5D76A9", "#12173F", "#FDB927"],
      logoImage: generateLogoUrl("MEM"),
    },
  },
  {
    teamId: "16",
    name: "Miami Heat",
    info: {
      abbrev: "MIA",
      colors: ["#98002E", "#000000", "#F9A01B"],
      logoImage: generateLogoUrl("MIA"),
    },
  },
  {
    teamId: "17",
    name: "Milwaukee Bucks",
    info: {
      abbrev: "MIL",
      colors: ["#00471B", "#EEE1C6", "#0077C0"],
      logoImage: generateLogoUrl("MIL"),
    },
  },
  {
    teamId: "18",
    name: "Minnesota Timberwolves",
    info: {
      abbrev: "MIN",
      colors: ["#236192", "#0C2340", "#78BE20"],
      logoImage: generateLogoUrl("MIN"),
    },
  },
  {
    teamId: "19",
    name: "New Orleans Pelicans",
    info: {
      abbrev: "NOP",
      colors: ["#85714D", "#002B5C", "#E31837"],
      logoImage: generateLogoUrl("NO"),
    },
  },
  {
    teamId: "20",
    name: "New York Knicks",
    info: {
      abbrev: "NYK",
      colors: ["#006BB6", "#F58426", "#000000"],
      logoImage: generateLogoUrl("NYK"),
    },
  },
  {
    teamId: "21",
    name: "Oklahoma City Thunder",
    info: {
      abbrev: "OKC",
      colors: ["#007AC1", "#EF3B24", "#002D62"],
      logoImage: generateLogoUrl("OKC"),
    },
  },
  {
    teamId: "22",
    name: "Orlando Magic",
    info: {
      abbrev: "ORL",
      colors: ["#0077C0", "#C4CED4", "#000000"],
      logoImage: generateLogoUrl("ORL"),
    },
  },
  {
    teamId: "23",
    name: "Philadelphia 76ers",
    info: {
      abbrev: "PHI",
      colors: ["#006BB6", "#ED174C", "#005397"],
      logoImage: generateLogoUrl("PHI"),
    },
  },
  {
    teamId: "24",
    name: "Phoenix Suns",
    info: {
      abbrev: "PHX",
      colors: ["#E56020", "#1D1160"],
      logoImage: generateLogoUrl("PHO"),
    },
  },
  {
    teamId: "25",
    name: "Portland Trail Blazers",
    info: {
      abbrev: "POR",
      colors: ["#E03A3E", "#000000", "#A1A1A4"],
      logoImage: generateLogoUrl("POR"),
    },
  },
  {
    teamId: "26",
    name: "Sacramento Kings",
    info: {
      abbrev: "SAC",
      colors: ["#5A2D81", "#63727A", "#63727A"],
      logoImage: generateLogoUrl("SAC"),
    },
  },
  {
    teamId: "27",
    name: "San Antonio Spurs",
    info: {
      abbrev: "SAS",
      colors: ["#A1A1A4", "#C4CED4", "#000000"],
      logoImage: generateLogoUrl("SAS"),
    },
  },
  {
    teamId: "28",
    name: "Toronto Raptors",
    info: {
      abbrev: "TOR",
      colors: ["#CE1141", "#000000", "#A1A1A4"],
      logoImage: generateLogoUrl("TOR"),
    },
  },
  {
    teamId: "29",
    name: "Utah Jazz",
    info: {
      abbrev: "UTA",
      colors: ["#002B5C", "#00471B", "#8B2131"],
      logoImage: generateLogoUrl("UTAH"),
    },
  },
  {
    teamId: "30",
    name: "Washington Wizards",
    info: {
      abbrev: "WAS",
      colors: ["#002B5C", "#E31837"],
      logoImage: generateLogoUrl("WAS"),
    },
  },
];

export default nbaTeams;
