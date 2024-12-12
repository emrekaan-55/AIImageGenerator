import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings } from 'lucide-react-native';

export default function Home() {
  const [prompt, setPrompt] = React.useState('');
  const [selectedStyle, setSelectedStyle] = React.useState(null);

  const styles = [
    { id: 1, name: 'Realistic', icon: '🖼' },
    { id: 2, name: 'Artistic', icon: '🎨' },
    { id: 3, name: 'Anime', icon: '✨' },
    { id: 4, name: '3D', icon: '💫' },
    { id: 5, name: 'Digital', icon: '🎮' },
  ];

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={s.header}>
        <Text style={s.headerTitle}>AI Image Generator</Text>
        <TouchableOpacity style={s.proButton}>
          <Text style={s.proButtonText}>Pro</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={s.content}>
        <View style={s.inputContainer}>
          <TextInput
            style={s.textInput}
            placeholder="Type your prompt here..."
            placeholderTextColor="#666"
            multiline
            value={prompt}
            onChangeText={setPrompt}
          />
          <TouchableOpacity style={s.settingsButton}>
            <Settings color="#8B5CF6" size={24} />
          </TouchableOpacity>
        </View>

        <View style={s.styleSection}>
          <Text style={s.sectionTitle}>Choose Style</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.styleScroll}>
            {styles.map((style) => (
              <TouchableOpacity
                key={style.id}
                style={[s.styleItem, selectedStyle === style.id && s.selectedStyle]}
                onPress={() => setSelectedStyle(style.id)}
              >
                <Text style={s.styleIcon}>{style.icon}</Text>
                <Text style={s.styleName}>{style.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity style={s.createButton}>
          <Text style={s.createButtonText}>Create</Text>
        </TouchableOpacity>
      </ScrollView>
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
  proButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  proButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  inputContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#262626',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  textInput: {
    color: '#FFFFFF',
    fontSize: 16,
    minHeight: 80,
  },
  settingsButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  styleSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 16,
    marginBottom: 12,
  },
  styleScroll: {
    paddingLeft: 16,
  },
  styleItem: {
    backgroundColor: '#262626',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    width: 80,
  },
  selectedStyle: {
    backgroundColor: '#8B5CF6',
  },
  styleIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  styleName: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  createButton: {
    backgroundColor: '#8B5CF6',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 


