// app/components/LoadingModal.js
import React from 'react';
import { Modal, View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const LoadingModal = ({ visible }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={s.container}>
        <View style={s.content}>
          <ActivityIndicator size="large" color="#8B5CF6" />
          <Text style={s.text}>Generating your image...</Text>
        </View>
      </View>
    </Modal>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#262626',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    marginTop: 12,
    fontSize: 16,
  },
});

export default LoadingModal;