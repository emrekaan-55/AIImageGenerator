// app/(auth)/register.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Google } from 'lucide-react-native';
import supabase from '../lib/supabaseClient';
// Import'u düzeltiyoruz
import { AuthInput, AuthButton, SocialButton } from '../components/auth/AuthComponents';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      Alert.alert(
        'Success',
        'Registration successful! Please check your email to verify your account.',
        [{ text: 'OK', onPress: () => router.push('/(auth)/login') }]
      );
    } catch (error) {
      Alert.alert('Error', error.message);
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
        <Text style={styles.headerTitle}>Create Account</Text>
      </View>

      <View style={styles.content}>
        <AuthInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <AuthInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <AuthInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <AuthButton
          title={loading ? "Creating Account..." : "Create Account"}
          onPress={handleRegister}
          disabled={loading}
        />

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <SocialButton
          text={<Google size={24} color="#FFFFFF" />}
          title="Continue with Google"
          onPress={() => {/* Google login logic */}}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <AuthButton
            title="Login"
            onPress={() => router.push('/(auth)/login')}
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