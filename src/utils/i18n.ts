/**
 * Created by Widiana Putra on 18/06/2022
 * Copyright (c) 2022 - Made with love
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJson from "../assets/locale/en.json";
import RNLanguageDetector from "@os-team/i18next-react-native-language-detector";

const resources = {
  en: enJson,
};
i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    supportedLngs: ["en"],
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
