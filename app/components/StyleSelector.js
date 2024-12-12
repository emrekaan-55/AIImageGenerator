import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const StyleSelector = ({ selectedStyle, onStyleSelect }) => {
  const styles = [
    { id: 1, name: 'Realistic', icon: '🖼' },
    { id: 2, name: 'Artistic', icon: '🎨' },
    { id: 3, name: 'Anime', icon: '✨' },
    { id: 4, name: '3D', icon: '💫' },
    { id: 5, name: 'Digital', icon: '🎮' },
  ];

  return (
    <View style={s.styleSection}>
      <Text style={s.sectionTitle}>Choose Style</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.styleScroll}>
        {styles.map((style) => (
          <TouchableOpacity
            key={style.id}
            style={[s.styleItem, selectedStyle === style.id && s.selectedStyle]}
            onPress={() => onStyleSelect(style.id)}
          >
            <Text style={s.styleIcon}>{style.icon}</Text>
            <Text style={s.styleName}>{style.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  styleSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 16,
    marginBottom: 12,
  },
  styleScroll: {
    paddingLeft: 16,
  },
  styleItem: {
    backgroundColor: '#262626',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    width: 80,
  },
  selectedStyle: {
    backgroundColor: '#8B5CF6',
  },
  styleIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  styleName: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});

export default StyleSelector;