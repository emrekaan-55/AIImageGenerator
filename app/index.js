// app/index.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// Components
import StyleSelector from './components/StyleSelector';
import PromptInput from './components/PromptInput';
import ProButton from './components/ProButton';
import CreateButton from './components/CreateButton';
import ProModal from './components/ProModal'; 

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [isProModalVisible, setIsProModalVisible] = useState(false);
  const router = useRouter();

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
        <Text style={s.headerTitle}>AI Image Generator</Text>
        <ProButton onPress={handleProPress} />
      </View>

      <ScrollView style={s.content}>
        {/* Prompt Input */}
        <PromptInput 
          value={prompt}
          onChangeText={setPrompt}
          onSettingsPress={handleSettingsPress}
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

      <ProModal
  visible={isProModalVisible}
  onClose={() => setIsProModalVisible(false)}
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
});