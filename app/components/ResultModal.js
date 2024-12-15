// app/components/ResultModal.js
import React from 'react';
import { Modal, View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { X, Download } from 'lucide-react-native';

const ResultModal = ({ visible, imageUrl, onClose, onSave }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View style={s.container}>
        <View style={s.content}>
          <TouchableOpacity style={s.closeButton} onPress={onClose}>
            <X color="#FFFFFF" size={24} />
          </TouchableOpacity>

          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={s.image}
              resizeMode="contain"
            />
          )}

          <TouchableOpacity style={s.saveButton} onPress={onSave}>
            <Download color="#FFFFFF" size={24} />
            <Text style={s.saveButtonText}>Save Image</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  image: {
    flex: 1,
    marginVertical: 20,
    borderRadius: 12,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#8B5CF6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResultModal;