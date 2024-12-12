import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Image as ImageIcon, Sliders, Lock, Info } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function Settings() {
  const router = useRouter();
  
  const settingsItems = [
    {
      icon: <ImageIcon size={24} color="#8B5CF6" />,
      title: 'Image Quality',
      description: 'Set default image resolution',
    },
    {
      icon: <Sliders size={24} color="#8B5CF6" />,
      title: 'Advanced Settings',
      description: 'Fine-tune generation parameters',
    },
    {
      icon: <Lock size={24} color="#8B5CF6" />,
      title: 'Privacy',
      description: 'Manage your data and privacy',
    },
    {
      icon: <Info size={24} color="#8B5CF6" />,
      title: 'About',
      description: 'App info and support',
    },
  ];

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={s.backButton}
        >
          <ArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={s.content}>
        {settingsItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={s.settingItem}
            onPress={() => console.log(`Pressed ${item.title}`)}
          >
            <View style={s.iconContainer}>{item.icon}</View>
            <View style={s.textContainer}>
              <Text style={s.itemTitle}>{item.title}</Text>
              <Text style={s.itemDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
});