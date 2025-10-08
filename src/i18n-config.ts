import { Languages } from "./constants/enums";

export type languagesType = Languages.ARABIC | Languages.ENGLISH;
type i18Type = {
  defaultLocale: string;
  locales: languagesType[];
};
export const i18n: i18Type = {
  defaultLocale: Languages.ENGLISH,
  locales: [Languages.ARABIC, Languages.ENGLISH],
};

export type Locale = (typeof i18n)["locales"][number];
