import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { X, Image, Settings, Globe, Info, LogIn, LogOut, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import supabase from '../lib/supabaseClient';

const DrawerMenu = ({ visible, onClose, isAuthenticated, userEmail }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      Alert.alert('Success', 'Logged out successfully', [
        {
          text: 'OK',
          onPress: () => {
            onClose();
            router.push('/');
          }
        }
      ]);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={s.overlay}>
        <View style={[s.menuContainer, { right: visible ? '20%' : '100%' }]}>
          <TouchableOpacity
            style={s.closeButton}
            onPress={onClose}
          >
            <X color="#FFFFFF" size={24} />
          </TouchableOpacity>

          {isAuthenticated ? (
            // Kullanıcı giriş yapmışsa profil bölümü
            <View style={s.profileSection}>
              <View style={s.avatarContainer}>
                <User size={32} color="#8B5CF6" />
              </View>
              <Text style={s.emailText}>{userEmail}</Text>
            </View>
          ) : (
            // Kullanıcı giriş yapmamışsa login butonu
            <TouchableOpacity
              style={s.loginButton}
              onPress={() => {
                onClose();
                router.push('/');
              }}
            >
              <LogIn size={24} color="#FFFFFF" />
              <Text style={s.menuText}>Login</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={s.menuItem}
            onPress={() => {
              onClose();
              router.push('/my-images'); 
            }}
          >
            <Image size={24} color="#FFFFFF" />
            <Text style={s.menuText}>My Images</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={s.menuItem}
            onPress={() => {
              onClose();
              router.push('/settings');
            }}
          >
            <Settings size={24} color="#FFFFFF" />
            <Text style={s.menuText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.menuItem}>
            <Globe size={24} color="#FFFFFF" />
            <Text style={s.menuText}>Web Site</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.menuItem}>
            <Info size={24} color="#FFFFFF" />
            <Text style={s.menuText}>About</Text>
          </TouchableOpacity>

          {isAuthenticated && (
            <TouchableOpacity
              style={[s.menuItem, s.logoutButton]}
              onPress={handleLogout}
            >
              <LogOut size={24} color="#FF4B4B" />
              <Text style={[s.menuText, s.logoutText]}>Logout</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const s = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    right: '100%',
    width: '80%',
    height: '100%',
    backgroundColor: '#262626',
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
    marginBottom: 20,
  },
  profileSection: {
    marginBottom: 30,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#333333',
    borderRadius: 12,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#404040',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  emailText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#333333',
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 12,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 30,
    borderRadius: 8,
    backgroundColor: '#8B5CF6',
  },
  logoutButton: {
    marginTop: 'auto',
    backgroundColor: '#331111',
  },
  logoutText: {
    color: '#FF4B4B',
  }
});

export default DrawerMenu;