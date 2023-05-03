import i18n from "i18next";
import {initReactI18next} from "react-i18next"

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                "Sign up" : "Sign up",
                "Passwords do not match": "Passwords do not match",
                "Username": "Username",
                "Display Name": "Display Name",
                "Password": "Password",
                "Confirm Password": "Confirm Password",
                "Login":"Login"
            }
        },
        tr: {
            translations: {
                "Sign up" : "Kayıt Ol",
                "Passwords do not match": "Şifreler eşleşmiyor",
                "Username": "Kullanıcı Adı",
                "Display Name": "Gösterilecek İsim",
                "Password": "Şifre",
                "Confirm Password": "Şifre Tekrar",
                "Login":"Giriş Yap"
            }
        }
    },
    fallbackLng: "tr",
    ns: ["translations"],
    defaultNS: "translations",
    keySeperator: false,
    interpolation: {
        escapeValue: false,
        formatSeperator: ","
    },
    react: {
        wait: true
    }
});

export default i18n;