import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import en from "../Assets/Locale/en.json";

const resources = {
  en: {
    translation: en,
  },
};

declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  returnNull: false,

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
  saveMissing: true,
  fallbackLng: (code: string) => {
    if (code === "keys") return "";
    return "en";
  },
});

export default i18n;
