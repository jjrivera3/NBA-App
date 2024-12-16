export const normalizeTeamAbbreviation = (abbreviation: string) => {
  const mapping: { [key: string]: string } = {
    CHO: "CHA",
    PHO: "PHX",
    BRK: "BKN",
  };
  return mapping[abbreviation] || abbreviation;
};
