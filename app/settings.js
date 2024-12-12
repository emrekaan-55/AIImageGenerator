import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Image as ImageIcon, Sliders, Lock, Info, Globe, CheckCircle as Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import i18n, { changeLanguage } from './utils/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState('en');
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  useEffect(() => {
    loadCurrentLanguage();
  }, []);

  const loadCurrentLanguage = async () => {
    try {
      const savedLang = await AsyncStorage.getItem('userLanguage');
      if (savedLang) {
        setCurrentLang(savedLang);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const settingsItems = [
    {
      icon: <ImageIcon size={24} color="#8B5CF6" />,
      title: i18n.t('settings.imageQuality'),
      description: i18n.t('settings.imageQualityDesc'),
    },
    {
      icon: <Globe size={24} color="#8B5CF6" />,
      title: i18n.t('settings.language'),
      description: currentLang === 'en' ? 'English' : 'Türkçe',
      onPress: () => setShowLanguageModal(true)
    },
    {
      icon: <Lock size={24} color="#8B5CF6" />,
      title: i18n.t('settings.privacy'),
      description: i18n.t('settings.privacyDesc'),
    },
    {
      icon: <Info size={24} color="#8B5CF6" />,
      title: i18n.t('settings.about'),
      description: i18n.t('settings.aboutDesc'),
    },
  ];

  const handleLanguageChange = async (lang) => {
    try {
      await changeLanguage(lang);
      setCurrentLang(lang);
      setShowLanguageModal(false);
      router.replace('/settings');
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={s.backButton}
        >
          <ArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>{i18n.t('settings.title')}</Text>
      </View>

      <ScrollView style={s.content}>
        {settingsItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={s.settingItem}
            onPress={item.onPress || (() => console.log(`${item.title} pressed`))}
          >
            <View style={s.iconContainer}>{item.icon}</View>
            <View style={s.textContainer}>
              <Text style={s.itemTitle}>{item.title}</Text>
              <Text style={s.itemDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={s.modalOverlay}>
          <View style={s.modalContent}>
            <View style={s.modalHeader}>
              <Text style={s.modalTitle}>{i18n.t('settings.selectLanguage')}</Text>
              <TouchableOpacity
                onPress={() => setShowLanguageModal(false)}
                style={s.closeButton}
              >
                <ArrowLeft color="#FFFFFF" size={24} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[s.languageOption, currentLang === 'en' && s.selectedLanguage]}
              onPress={() => handleLanguageChange('en')}
            >
              <Text style={s.languageText}>English</Text>
              {currentLang === 'en' && <Check color="#8B5CF6" size={20} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[s.languageOption, currentLang === 'tr' && s.selectedLanguage]}
              onPress={() => handleLanguageChange('tr')}
            >
              <Text style={s.languageText}>Türkçe</Text>
              {currentLang === 'tr' && <Check color="#8B5CF6" size={20} />}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#262626',
    borderRadius: 12,
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#A3A3A3',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#262626',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedLanguage: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  languageText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Settings;