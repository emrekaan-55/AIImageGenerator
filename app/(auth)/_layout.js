// app/(auth)/_layout.js
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="login" 
        // options={{ title: 'Login' }}  // İsterseniz başlık ekleyebilirsiniz
      />
      <Stack.Screen 
        name="register" 
        // options={{ title: 'Register' }} // İsterseniz başlık ekleyebilirsiniz
      />
    </Stack>
  );
}