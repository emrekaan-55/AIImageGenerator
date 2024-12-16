// app/components/ResultModal.js
import React from 'react';
import { Modal, View, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { X, Download } from 'lucide-react-native';
import supabase from '../lib/supabaseClient';

const ResultModal = ({ visible, imageUrl, prompt, selectedStyle, onClose, onSave }) => {

 const handleSave = async () => {
   try {
     const { data: { user } } = await supabase.auth.getUser();
     
     if (!user) {
       Alert.alert("Uyarı", "Görsel kaydetmek için giriş yapmalısınız."); 
       return;
     }

     const { data, error } = await supabase
       .from('images')
       .insert([
         {
           user_id: user.id,
           image_url: imageUrl,
           prompt: prompt,
           style_id: selectedStyle
         }
       ]);

     if (error) throw error;

     Alert.alert("Başarılı", "Görsel kaydedildi!");
     onClose();

   } catch (error) {
     console.error('Kaydetme hatası:', error);
     Alert.alert("Hata", "Görsel kaydedilemedi.");
   }
 };

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

         <TouchableOpacity style={s.saveButton} onPress={handleSave}>
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