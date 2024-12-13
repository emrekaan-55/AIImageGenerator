import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft, Home, Image, Settings, LogIn, UserPlus, Info, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const DrawerMenu = ({ visible, onClose, onSettingsPress }) => {
  const router = useRouter();

  const menuItems = [
    { 
      icon: <Home size={24} color="#FFFFFF" />, 
      title: 'Home',
      onPress: () => router.push('/')
    },
    { 
      icon: <Image size={24} color="#FFFFFF" />, 
      title: 'My Images'
    },
    { 
      icon: <Settings size={24} color="#FFFFFF" />, 
      title: 'Settings', 
      onPress: onSettingsPress 
    },
    { 
      icon: <LogIn size={24} color="#FFFFFF" />, 
      title: 'Login / Register',
      onPress: () => router.push('/auth')
    },
    { 
      icon: <Info size={24} color="#FFFFFF" />, 
      title: 'About' 
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={s.overlay}>
        <View style={s.menuContainer}>
          <View style={s.header}>
            <TouchableOpacity onPress={onClose} style={s.closeButton}>
              <X color="#FFFFFF" size={24} />
            </TouchableOpacity>
          </View>
          
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={[s.menuItem, item.onPress && s.clickableItem]}
              onPress={() => {
                if (item.onPress) {
                  item.onPress();
                } else {
                  console.log(`${item.title} pressed`);
                }
                onClose();
              }}
            >
              <View style={s.iconContainer}>
                {item.icon}
              </View>
              <Text style={s.menuItemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
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
    width: '70%',
    height: '100%',
    backgroundColor: '#262626',
    padding: 16,
  },
  header: {
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  clickableItem: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default DrawerMenu;