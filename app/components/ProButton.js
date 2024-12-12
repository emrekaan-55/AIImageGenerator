import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ProButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={s.proButton} onPress={onPress}>
      <Text style={s.proButtonText}>Pro</Text>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  proButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  proButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default ProButton;