import localization from "./LocalizationCz.json";
export function getL(id: string): string {
  const found = Object.entries(localization).find((entry) => entry[0] === id);
  return found !== undefined ? found[1] : "";
}

export default localization;
