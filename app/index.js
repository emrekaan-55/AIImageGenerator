// app/index.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Settings, Menu } from 'lucide-react-native';

// Components
import StyleSelector from './components/StyleSelector';
import PromptInput from './components/PromptInput';
import ProButton from './components/ProButton';
import CreateButton from './components/CreateButton';
import ProModal from './components/ProModal';
import DrawerMenu from './components/DrawerMenu';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [isProModalVisible, setIsProModalVisible] = useState(false);
  const router = useRouter();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleCreatePress = () => {
    console.log('Creating image with:', { prompt, selectedStyle });
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
  <Text style={s.headerTitle}>AI Image Generator</Text>
  <ProButton onPress={handleProPress} />
</View>

      <ScrollView style={s.content}>
        {/* Prompt Input */}
        <PromptInput 
          value={prompt}
          onChangeText={setPrompt}
          
        />

        {/* Style Selector */}
        <StyleSelector 
          selectedStyle={selectedStyle}
          onStyleSelect={setSelectedStyle}
        />
          
        {/* Create Button */}
        <CreateButton 
          onPress={handleCreatePress}
          disabled={!prompt.trim() || !selectedStyle}
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