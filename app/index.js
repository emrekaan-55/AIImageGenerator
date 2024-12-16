import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LogIn, UserPlus } from 'lucide-react-native';
import AuthModal from './components/AuthModal';

export default function Index() {
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [initialMode, setInitialMode] = useState('login'); // 'login' or 'register'
  const router = useRouter();

  const handleAuthButton = (mode) => {
    setInitialMode(mode);
    setAuthModalVisible(true);
  };

  return (
    <SafeAreaView style={s.container}>
      <StatusBar style="light" />
      
      <View style={s.header}>
        <Text style={s.title}>AI Image Generator</Text>
        <Text style={s.subtitle}>Create amazing images with AI</Text>
      </View>

      <View style={s.buttonsContainer}>
        <TouchableOpacity 
          style={[s.button, s.primaryButton]}
          onPress={() => handleAuthButton('login')}
        >
          <LogIn color="#FFFFFF" size={20} style={s.buttonIcon} />
          <Text style={s.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[s.button, s.secondaryButton]}
          onPress={() => handleAuthButton('register')}
        >
          <UserPlus color="#8B5CF6" size={20} style={s.buttonIcon} />
          <Text style={[s.buttonText, s.secondaryButtonText]}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[s.button, s.skipButton]}
          onPress={() => router.push('/home')}
        >
          <Text style={[s.buttonText, s.skipButtonText]}>
            Continue without account
          </Text>
        </TouchableOpacity>
      </View>

      <AuthModal 
        visible={authModalVisible}
        onClose={() => setAuthModalVisible(false)}
        initialMode={initialMode}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#A3A3A3',
    textAlign: 'center',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#8B5CF6',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  skipButton: {
    backgroundColor: 'transparent',
    marginTop: 20,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#8B5CF6',
  },
  skipButtonText: {
    color: '#666666',
  },
});