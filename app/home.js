// app/home.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Menu } from 'lucide-react-native';
import DrawerMenu from '../components/DrawerMenu';
import ImageGenerator from '../components/ImageGenerator';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '../lib/supabase';

export default function Home() {
  const router = useRouter();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsAuthenticated(true);
        setUser(session.user);
      }
      if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
      setUser(user);
    } catch (error) {
      console.error('Auth check error:', error);
    }
  };

  const handleSettingsPress = () => {
    setIsMenuVisible(false);
    router.push('/settings');
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsMenuVisible(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => setIsMenuVisible(true)}
          style={styles.menuButton}
        >
          <Menu size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <ImageGenerator />
      </View>

      {/* Drawer Menu */}
      <DrawerMenu 
        visible={isMenuVisible} 
        onClose={() => setIsMenuVisible(false)}
        isAuthenticated={isAuthenticated}
        userInfo={user}
        onSettingsPress={handleSettingsPress}
        onLogout={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#262626',
  },
  menuButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});