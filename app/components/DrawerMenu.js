// app/components/DrawerMenu.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';
import { X, Home, Image, Info, Settings } from 'lucide-react-native';

const DrawerMenu = ({ visible, onClose, onSettingsPress }) => {
    const menuItems = [
      { icon: <Home size={24} color="#FFFFFF" />, title: 'Home' },
      { icon: <Image size={24} color="#FFFFFF" />, title: 'My Images' },
      { icon: <Settings size={24} color="#FFFFFF" />, title: 'Settings', onPress: onSettingsPress },
      { icon: <Info size={24} color="#FFFFFF" />, title: 'About' },
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
                style={s.menuItem}
                onPress={() => {
                  if (item.onPress) {
                    item.onPress();
                  } else {
                    console.log(`${item.title} pressed`);
                  }
                  onClose();
                }}
              >
                {item.icon}
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
  },
  menuItemText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 16,
  },
});

export default DrawerMenu;