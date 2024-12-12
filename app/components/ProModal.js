// app/components/ProModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';

const ProModal = ({ visible, onClose }) => {
  const features = [
    'Unlimited image generations',
    'Higher resolution outputs',
    'Priority processing',
    'Advanced style controls',
    'No watermarks'
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={s.centeredView}>
        <View style={s.modalView}>
          <TouchableOpacity style={s.closeButton} onPress={onClose}>
            <X color="#FFFFFF" size={24} />
          </TouchableOpacity>
          
          <Text style={s.title}>Upgrade to Pro</Text>
          <Text style={s.subtitle}>Get access to premium features</Text>

          <View style={s.featuresContainer}>
            {features.map((feature, index) => (
              <View key={index} style={s.featureRow}>
                <Text style={s.checkmark}>✓</Text>
                <Text style={s.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={s.upgradeButton}>
            <Text style={s.upgradeButtonText}>Upgrade Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const s = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#262626',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: '60%',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#A3A3A3',
    marginBottom: 24,
  },
  featuresContainer: {
    marginVertical: 24,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkmark: {
    color: '#8B5CF6',
    fontSize: 18,
    marginRight: 12,
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  upgradeButton: {
    backgroundColor: '#8B5CF6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  upgradeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProModal;