import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
    .use(Backend) // Enables loading files from public/locales
    .use(initReactI18next) // Passes i18n to react-i18next
    .init({
        fallbackLng: "en",
        lng: "ar",
        backend: {
            loadPath: "/locales/{{lng}}/translation.json", // Path to translation files
        },
        interpolation: {
            escapeValue: false, // React already escapes values
        },
    });

export default i18n;
