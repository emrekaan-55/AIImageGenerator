import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import supabase from '../lib/supabaseClient';

const AuthModal = ({ visible, onClose, initialMode }) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);

  const handleSuccess = () => {
    onClose();
    router.push('/home');
  };

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        Alert.alert('Success', 'Logged in successfully', [
          { text: 'OK', onPress: handleSuccess }
        ]);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;

        if (data?.user?.identities?.length === 0) {
          Alert.alert('Error', 'This email is already registered');
          return;
        }
        
        Alert.alert(
          'Success', 
          'Account created successfully! Please check your email to confirm your account.',
          [
            { text: 'OK', onPress: handleSuccess }
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setShowPassword(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={s.overlay}>
        <View style={s.modalContainer}>
          <View style={s.header}>
            <Text style={s.title}>{isLogin ? 'Login' : 'Create Account'}</Text>
            <TouchableOpacity style={s.closeButton} onPress={onClose}>
              <X color="#FFFFFF" size={24} />
            </TouchableOpacity>
          </View>

          <View style={s.inputContainer}>
            <View style={s.inputWrapper}>
              <Mail color="#8B5CF6" size={20} style={s.inputIcon} />
              <TextInput
                style={s.input}
                placeholder="Email"
                placeholderTextColor="#666666"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            <View style={s.inputWrapper}>
              <Lock color="#8B5CF6" size={20} style={s.inputIcon} />
              <TextInput
                style={[s.input, { flex: 1 }]}
                placeholder="Password"
                placeholderTextColor="#666666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="password"
              />
              <TouchableOpacity
                style={s.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff color="#666666" size={20} />
                ) : (
                  <Eye color="#666666" size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[s.button, isLoading && s.buttonDisabled]}
            onPress={handleAuth}
            disabled={isLoading}
          >
            <Text style={s.buttonText}>
              {isLoading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.switchMode} onPress={toggleMode}>
            <Text style={s.switchText}>
              {isLogin
                ? "Don't have an account? Register"
                : 'Already have an account? Login'}
            </Text>
          </TouchableOpacity>

          {isLogin && (
            <TouchableOpacity style={s.forgotPassword}>
              <Text style={s.forgotPasswordText}>Forgot Password?</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#262626',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: '60%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 4,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 4,
  },
  button: {
    backgroundColor: '#8B5CF6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchMode: {
    alignItems: 'center',
    marginBottom: 16,
  },
  switchText: {
    color: '#8B5CF6',
    fontSize: 14,
  },
  forgotPassword: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#666666',
    fontSize: 14,
  },
});

export default AuthModal;