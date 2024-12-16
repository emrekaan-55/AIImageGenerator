import React from 'react';
import { Modal, View, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { X, Download } from 'lucide-react-native';
import supabase from '../lib/supabaseClient';

const ResultModal = ({ visible, imageUrl, prompt, selectedStyle, onClose }) => {
  const saveImage = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        Alert.alert('Error', 'Please login to save images');
        return;
      }

      const { error } = await supabase
        .from('images')
        .insert({
          image_url: imageUrl,
          prompt: prompt,
          style_id: selectedStyle,
          user_id: user.id
        });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      Alert.alert('Success', 'Image saved successfully!');
      onClose();
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Error', 'Failed to save image');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X color="#FFFFFF" size={24} />
          </TouchableOpacity>

          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="contain"
            />
          )}

          <TouchableOpacity style={styles.saveButton} onPress={saveImage}>
            <Download color="#FFFFFF" size={24} />
            <Text style={styles.saveButtonText}>Save Image</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ResultModal;

const styles = StyleSheet.create({
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