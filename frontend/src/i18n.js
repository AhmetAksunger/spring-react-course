import i18n from "i18next";
import {initReactI18next} from "react-i18next"
import {register} from "timeago.js"

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
                "Login":"Login",
                "Logout":"Logout",
                "Users":"Users",
                "Next":"Next >",
                "Previous":"< Previous",
                "Failure":"Failure",
                "User not found": "User not found",
                "Edit":"Edit",
                "Save":"Save",
                "Cancel":"Cancel",
                "Edit Display Name":"Edit Display Name",
                "Choose Profile Picture": "Choose Profile Picture",
                "My Profile": "My Profile",
                "There are no hoaxes": "There are no hoaxes",
                "Load Old Hoaxes": "Load Old Hoaxes",
                "There are some new hoaxes": "There are some new hoaxes",
                "Are you sure to delete the hoax?": "Are you sure to delete the hoax?",
                "Delete": "Delete",
                "Delete Hoax": "Delete Hoax",
                "Close": "Close",
                "Delete Account": "Delete Account",
                "Are you sure to delete your account?": "Are you sure to delete your account?"
                
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
                "Login":"Giriş Yap",
                "Logout":"Çıkış yap",
                "Users":"Kullanıcılar",
                "Next":"İleri >",
                "Previous":"< Geri",
                "Failure":"Başarısız",
                "User not found": "Kullanıcı bulunamadı",
                "Edit":"Düzenle",
                "Save":"Kaydet",
                "Cancel":"İptal et",
                "Edit Display Name":"Gösterilecek İsmi Düzenle",
                "Choose Profile Picture": "Profil Resmi Yükle",
                "My Profile": "Profilim",
                "There are no hoaxes": "Herhangi bir hoax yok",
                "Load Old Hoaxes": "Eski Hoaxları yükle",
                "There are some new hoaxes": "Yeni hoaxlar var",
                "Are you sure to delete the hoax?": "Hoax'u silmek istediğine emin misin?",
                "Delete": "Sil",
                "Delete Hoax": "Hoax'u sil",
                "Close": "Kapat",
                "Delete Account": "Hesabı Sil",
                "Are you sure to delete your account?": "Hesabını silmek istediğine emin misin?"
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

export const timeAgoTr = (number, index) => {
    return [
      ['az önce', 'şimdi'],
      ['%s saniye önce', '%s saniye içinde'],
      ['1 dakika önce', '1 dakika içinde'],
      ['%s dakika önce', '%s dakika içinde'],
      ['1 saat önce', '1 saat içinde'],
      ['%s saat önce', '%s saat içinde'],
      ['1 gün önce', '1 gün içinde'],
      ['%s gün önce', '%s gün içinde'],
      ['1 hafta önce', '1 hafta içinde'],
      ['%s hafta önce', '%s hafta içinde'],
      ['1 ay önce', '1 ay içinde'],
      ['%s ay önce', '%s ay içinde'],
      ['1 yıl önce', '1 yıl içinde'],
      ['%s yıl önce', '%s yıl içinde'],
    ][index];
  }

  register('tr', timeAgoTr);

export default i18n;