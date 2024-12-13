import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import supabase from '../lib/supabaseClient';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profil</Text>
      {user ? (
        <View>
          <Text style={styles.info}>E-posta: {user.email}</Text>
          {/* Diğer kullanıcı bilgilerini burada gösterebilirsiniz */}
        </View>
      ) : (
        <Text style={styles.loading}>Kullanıcı bilgileri yükleniyor...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  loading: {
    fontSize: 18,
    color: 'gray',
  },
});

export default Profile;