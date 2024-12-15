// app/(tabs)/home.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Settings, Menu } from 'lucide-react-native';

// Import yollarını tek üst dizine göre düzeltelim
import i18n, { initializeLanguage } from '../utils/i18n';
import supabase from '../lib/supabaseClient';

// Components
import StyleSelector from '../components/StyleSelector';
import PromptInput from '../components/PromptInput';
import ProButton from '../components/ProButton';
import CreateButton from '../components/CreateButton';
import ProModal from '../components/ProModal';
import DrawerMenu from '../components/DrawerMenu';
import LoadingModal from '../components/LoadingModal';
import ResultModal from '../components/ResultModal';

// Services
import { generateImage } from '../services/api';

// ... geri kalan kod aynı kalacak

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [isProModalVisible, setIsProModalVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
  const router = useRouter();

  useEffect(() => {
    initializeLanguage();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsAuthenticated(!!user);
    if (user) {
      setUserEmail(user.email);
    }
  };

  const handleCreatePress = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt');
      return;
    }

    try {
      setIsLoading(true);
      console.log('Starting image generation...');
      const imageUrl = await generateImage(prompt, selectedStyle);
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
      </ScrollView>

      <DrawerMenu 
        visible={isMenuVisible} 
        onClose={() => setIsMenuVisible(false)}
        isAuthenticated={isAuthenticated}
        userEmail={userEmail}
      />

      <ProModal
        visible={isProModalVisible}
        onClose={() => setIsProModalVisible(false)}
      />

      <LoadingModal visible={isLoading} />

      <ResultModal
        visible={showResult}
        imageUrl={generatedImageUrl}
        prompt={prompt}
        style={selectedStyle}
        onClose={() => {
          setShowResult(false);
          setGeneratedImageUrl(null);
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
  menuButton: {
    padding: 8,
  }
});a