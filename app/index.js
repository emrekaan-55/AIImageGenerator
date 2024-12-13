// app/index.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Settings, Menu } from 'lucide-react-native';
import i18n, { initializeLanguage } from './utils/i18n';
import supabase from './lib/supabaseClient';

// Components
import StyleSelector from './components/StyleSelector';
import PromptInput from './components/PromptInput';
import ProButton from './components/ProButton';
import CreateButton from './components/CreateButton';
import ProModal from './components/ProModal';
import DrawerMenu from './components/DrawerMenu';
import LoadingModal from './components/LoadingModal';
import ResultModal from './components/ResultModal';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

// Services
import { generateImage } from './services/api';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [isProModalVisible, setIsProModalVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    initializeLanguage();

    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    };

    checkAuth();
  }, []);

  const handleCreatePress = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt');
      return;
    }

    try {
      setIsLoading(true);
      console.log('Starting image generation...');
      const imageUrl = await generateImage(prompt, selectedStyle);
      console.log('Generated URL:', imageUrl);
      setGeneratedImageUrl(imageUrl);
      setShowResult(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate image. Please try again.');
      console.error('Error in handleCreatePress:', error);
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
        {!isAuthenticated ? (
          <>
            <Login />
            <Register />
          </>
        ) : (
          <>
            <Profile />
            <PromptInput 
              value={prompt}
              onChangeText={setPrompt}
              placeholder={i18n.t('prompt.placeholder')}
            />

            <StyleSelector 
              selectedStyle={selectedStyle}
              onStyleSelect={setSelectedStyle}
            />
         
            <CreateButton 
              onPress={handleCreatePress}
              disabled={!prompt.trim() || !selectedStyle}
            />
          </>
        )}
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
          console.log('Saving image:', generatedImageUrl);
        }}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
  },
  menuButton: {
    padding: 8,
  }
});