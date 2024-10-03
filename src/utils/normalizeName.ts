// utils/normalizeName.ts
export const normalizeName = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/['’]/g, "") // Remove apostrophes
    .replace(/\s+/g, "-"); // Replace white spaces with hyphen
};
