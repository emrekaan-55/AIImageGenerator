// app/auth.js
export default function Auth() {
    return (
      <SafeAreaView style={styles.container}>
        <Login />
        <Register />
      </SafeAreaView>
    );
  }