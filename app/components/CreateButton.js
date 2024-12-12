// app/components/CreateButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CreateButton = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity 
      style={[s.createButton, disabled && s.disabled]} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={s.createButtonText}>Create</Text>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  createButton: {
    backgroundColor: '#8B5CF6',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CreateButton;