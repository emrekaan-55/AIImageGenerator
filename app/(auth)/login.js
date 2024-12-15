// app/(auth)/login.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Google } from 'lucide-react-native';
import supabase from '../lib/supabaseClient';

// AuthComponents'ı düzgün şekilde import edelim
import { AuthInput, AuthButton, SocialButton } from '../components/auth/AuthComponents';
// Eğer default export kullanıyorsanız:
// import AuthComponents, { AuthInput, AuthButton, SocialButton } from '../../components/auth/AuthComponents';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      router.replace('/home');
    } catch (error) {
      Alert.alert('Hata', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AuthButton
          title=""
          onPress={() => router.back()}
          style={styles.backButton}
          icon={<ArrowLeft color="#FFFFFF" size={24} />}
        />
        <Text style={styles.headerTitle}>Giriş Yap</Text>
      </View>

      <View style={styles.content}>
        <AuthInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <AuthInput
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <AuthButton
          title={loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          onPress={handleLogin}
          disabled={loading}
        />

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>VEYA</Text>
          <View style={styles.dividerLine} />
        </View>

        <SocialButton
          onPress={() => {/* Google login logic */}}
          title="Google ile Devam Et"
        >
          <Google size={24} color="#FFFFFF" />
        </SocialButton>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Hesabınız yok mu? </Text>
          <AuthButton
            title="Kayıt Ol"
            onPress={() => router.push('/register')}
            style={styles.linkButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 8,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  dividerText: {
    color: '#666',
    paddingHorizontal: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#666',
  },
  linkButton: {
    backgroundColor: 'transparent',
    marginBottom: 0,
    paddingHorizontal: 8,
  },
});