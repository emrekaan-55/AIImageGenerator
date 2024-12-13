import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { X, Image, Settings, Globe, Info, LogOut, LogIn } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const DrawerMenu = ({ visible, onClose, isAuthenticated, userInfo }) => {
  const router = useRouter();

  const renderAuthenticatedContent = () => (
    <>
      <View style={s.userInfo}>
        <Text style={s.userName}>{userInfo?.name || 'Kullanıcı Adı'}</Text>
        <Text style={s.userEmail}>{userInfo?.email || 'kullanici@mail.com'}</Text>
      </View>
      
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
      
      <TouchableOpacity style={s.logoutButton}>
        <LogOut size={24} color="#FFFFFF" />
        <Text style={s.logoutText}>Hesaptan Çıkış</Text>
      </TouchableOpacity>
    </>
  );

  const renderUnauthenticatedContent = () => (
    <>
      <TouchableOpacity 
        style={s.loginButton}
        onPress={() => router.push('/login')}
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
    </>
  );

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
          
          {isAuthenticated ? renderAuthenticatedContent() : renderUnauthenticatedContent()}
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
  userInfo: {
    marginBottom: 30,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#A3A3A3',
    fontSize: 14,
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
    backgroundColor: '#DC2626',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 12,
  }
});

export default DrawerMenu;