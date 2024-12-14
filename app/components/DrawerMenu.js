import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { X, Image, Settings, Globe, Info, LogIn } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const DrawerMenu = ({ visible, onClose, isAuthenticated }) => {
  const router = useRouter();

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

          <TouchableOpacity 
            style={s.loginButton}
            onPress={() => {
              onClose();
              router.push('/auth/login');
            }}
          >
            <LogIn size={24} color="#FFFFFF" />
            <Text style={s.menuText}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={s.menuItem}>
            <Image size={24} color="#FFFFFF" />
            <Text style={s.menuText}>My Images</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={s.menuItem}>
            <Settings size={24} color="#FFFFFF" />
            <Text style={s.menuText}>Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={s.menuItem}>
            <Globe size={24} color="#FFFFFF" />
            <Text style={s.menuText}>Web Site</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={s.menuItem}>
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