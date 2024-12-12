import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Settings } from 'lucide-react-native';

const PromptInput = ({ value, onChangeText, onSettingsPress }) => {
  return (
    <View style={s.inputContainer}>
      <TextInput
        style={s.textInput}
        placeholder="Type your prompt here..."
        placeholderTextColor="#666"
        multiline
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity style={s.settingsButton} onPress={onSettingsPress}>
        <Settings color="#8B5CF6" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const s = StyleSheet.create({
  inputContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#262626',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  textInput: {
    color: '#FFFFFF',
    fontSize: 16,
    minHeight: 80,
  },
  settingsButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
});

export default PromptInput;