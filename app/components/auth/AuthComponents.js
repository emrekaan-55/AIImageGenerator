// app/components/auth/AuthComponents.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AuthInput = ({ placeholder, value, onChangeText, secureTextEntry = false }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    placeholderTextColor="#666"
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    autoCapitalize="none"
  />
);

const AuthButton = ({ title, onPress, style, icon, disabled }) => (
  <TouchableOpacity 
    style={[styles.button, style, disabled && styles.disabledButton]} 
    onPress={onPress}
    disabled={disabled}
  >
    {icon && <View style={styles.iconContainer}>{icon}</View>}
    {typeof title === 'string' && <Text style={styles.buttonText}>{title}</Text>}
  </TouchableOpacity>
);

const SocialButton = ({ icon, title, onPress, style }) => (
  <TouchableOpacity style={[styles.socialButton, style]} onPress={onPress}>
    {icon}
    <Text style={styles.socialButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#262626',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
  iconContainer: {
    marginRight: 8,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#262626',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  socialButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
});

// Named exports
export { AuthInput, AuthButton, SocialButton };

// Default export
const Components = {
  AuthInput,
  AuthButton,
  SocialButton
};

export default Components;