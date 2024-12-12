// app/utils/i18n.js
import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';
import en from '../locales/en';
import tr from '../locales/tr';

const i18n = new I18n({
  en,
  tr
});

// Varsayılan dili cihaz diline göre ayarla
i18n.locale = getLocales()[0].languageCode;
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

export default i18n;