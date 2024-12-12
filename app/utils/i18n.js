// app/utils/i18n.js
import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from '../locales/en';
import tr from '../locales/tr';

const i18n = new I18n({
  en,
  tr
});

i18n.enableFallback = true;
i18n.defaultLocale = 'en';

// Dil değişikliğini yönetecek fonksiyonlar
export const initializeLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem('userLanguage');
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    } else {
      i18n.locale = getLocales()[0].languageCode;
    }
  } catch (error) {
    console.error('Error loading language:', error);
    i18n.locale = 'en';
  }
};

export const changeLanguage = async (lang) => {
  try {
    await AsyncStorage.setItem('userLanguage', lang);
    i18n.locale = lang;
  } catch (error) {
    console.error('Error saving language:', error);
  }
};

export default i18n;