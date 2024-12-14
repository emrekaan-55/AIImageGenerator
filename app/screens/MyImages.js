// app/components/DrawerMenu.js
import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { X, Image, Settings, Globe, Info, LogIn, LogOut, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import supabase from '../lib/supabaseClient';

const DrawerMenu = ({ visible, onClose, isAuthenticated, userEmail }) => {
  const router = useRouter();

  const handleNavigation = (route) => {
    onClose();
    router.push(route);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      onClose();
      router.replace('/');
    } catch (error) {
      Alert.alert('Hata', 'Çıkış yapılırken bir sorun oluştu');
      console.error('Logout error:', error);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
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
            // Kullanıcı giriş yapmışsa
            <>
              <View style={s.userSection}>
                <View style={s.userIcon}>
                  <User size={24} color="#FFFFFF" />
                </View>
                <Text style={s.userEmail}>{userEmail}</Text>
              </View>

              <TouchableOpacity 
                style={s.menuItem}
                onPress={() => handleNavigation('/screens/MyImages')}
              >
                <Image size={24} color="#FFFFFF" />
                <Text style={s.menuText}>Görsellerim</Text>
              </TouchableOpacity>
            </>
          ) : (
            // Kullanıcı giriş yapmamışsa
            <TouchableOpacity
              style={s.loginButton}
              onPress={() => handleNavigation('/(auth)/login')}
            >
              <LogIn size={24} color="#FFFFFF" />
              <Text style={s.menuText}>Giriş Yap</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity 
            style={s.menuItem}
            onPress={() => handleNavigation('/settings')}
          >
            <Settings size={24} color="#FFFFFF" />
            <Text style={s.menuText}>Ayarlar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={s.menuItem}
            onPress={() => handleNavigation('/website')}
          >
            <Globe size={24} color="#FFFFFF" />
            <Text style={s.menuText}>Web Sitesi</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={s.menuItem}
            onPress={() => handleNavigation('/about')}
          >
            <Info size={24} color="#FFFFFF" />
            <Text style={s.menuText}>Hakkında</Text>
          </TouchableOpacity>

          {isAuthenticated && (
            <TouchableOpacity 
              style={s.logoutButton}
              onPress={handleLogout}
            >
              <LogOut size={24} color="#FF4444" />
              <Text style={s.logoutText}>Hesaptan Çıkış</Text>
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
  userSection: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#333333',
    borderRadius: 12,
  },
  userIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  userEmail: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 'auto',
    borderRadius: 8,
    backgroundColor: '#333333',
  },
  logoutText: {
    color: '#FF4444',
    fontSize: 16,
    marginLeft: 12,
  }
});

export default DrawerMenu;