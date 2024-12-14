import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { X, Image, Settings, Globe, Info, LogIn } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const DrawerMenu = ({ visible, onClose, isAuthenticated }) => {
  const router = useRouter();

  const handleNavigation = (route) => {
    onClose();
    router.push(route);
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

          {!isAuthenticated && (
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
            onPress={() => handleNavigation('/screens/MyImages')}
          >
            <Image size={24} color="#FFFFFF" />
            <Text style={s.menuText}>Görsellerim</Text>
          </TouchableOpacity>

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
  }
});

export default DrawerMenu;