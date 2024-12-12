import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const PromptInput = ({ value, onChangeText }) => { // onSettingsPress'i kaldırdık
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
  }
});

export default PromptInput;