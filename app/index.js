import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Settings, Menu } from 'lucide-react-native';


// Components
import StyleSelector from './components/StyleSelector';
import PromptInput from './components/PromptInput';
import ProButton from './components/ProButton';
import CreateButton from './components/CreateButton';
import ProModal from './components/ProModal';
import LoadingModal from './components/LoadingModal';
import ResultModal from './components/ResultModal';
import DrawerMenu from './components/DrawerMenu';
import i18n from './utils/i18n';

// Services
import { generateImage } from './services/api';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [isProModalVisible, setIsProModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState(i18n.locale);

  const handleCreatePress = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt');
      return;
    }

    try {
      setIsLoading(true);
      console.log('Starting image generation...'); // Debug log
      const imageUrl = await generateImage(prompt, selectedStyle);
      console.log('Generated URL:', imageUrl); // Debug log
      setGeneratedImageUrl(imageUrl);
      setShowResult(true);
    } catch (error) {
      console.error('Error in handleCreatePress:', error);
      Alert.alert(
        'Error',
        `Failed to generate image: ${error.message || 'Please try again.'}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleProPress = () => {
    setIsProModalVisible(true);
  };

  const handleSettingsPress = () => {
    router.push('/settings');
  };




  return (


    <SafeAreaView style={s.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity 
          onPress={() => setIsMenuVisible(true)}
          style={s.menuButton}
        >
          <Menu color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>{i18n.t('appName')}</Text>
        <ProButton onPress={handleProPress} />
      </View>

      <ScrollView style={s.content}>
        <PromptInput 
          value={prompt}
          onChangeText={setPrompt}
          placeholder={i18n.t('prompt.placeholder')}
        />

        {/* Style Selector */}
        <StyleSelector 
          title={i18n.t('styles.title')}
          selectedStyle={selectedStyle}
          onStyleSelect={setSelectedStyle}
          styles={[
            { id: 1, name: i18n.t('styles.realistic'), icon: '🖼' },
            { id: 2, name: i18n.t('styles.artistic'), icon: '🎨' },
            { id: 3, name: i18n.t('styles.anime'), icon: '✨' },
            { id: 4, name: i18n.t('styles.threeD'), icon: '💫' },
            { id: 5, name: i18n.t('styles.digital'), icon: '🎮' },
          ]}
        />


        {/* Create Button */}
        <CreateButton 
          onPress={handleCreatePress}
          disabled={!prompt.trim() || !selectedStyle}
          title={i18n.t('buttons.create')}
        />
      </ScrollView>

      <DrawerMenu
        visible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        onSettingsPress={handleSettingsPress}
      />

      <ProModal
        visible={isProModalVisible}
        onClose={() => setIsProModalVisible(false)}
      />

      <LoadingModal visible={isLoading} />
      <ResultModal
        visible={showResult}
        imageUrl={generatedImageUrl}
        onClose={() => {
          setShowResult(false);
          setGeneratedImageUrl(null);
        }}
        onSave={() => {
          // Resmi kaydetme işlemi
          console.log('Saving image:', generatedImageUrl);
        }}
      />

    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  menuButton: {
    padding: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  content: {
    flex: 1,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingsButton: {
    padding: 8,
  }


});