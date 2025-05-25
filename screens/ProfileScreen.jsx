import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/ayamgoreng.png')}
        style={styles.avatar}
      />
      <Text style={styles.name}>Santapanku User</Text>
      <Text style={styles.email}>user@santapanku.com</Text>
      <Text style={styles.bio}>
        Pecinta kuliner sejati. Suka mencoba berbagai makanan khas Indonesia.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff' },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  email: { fontSize: 16, color: '#4e7fff', marginBottom: 12 },
  bio: { fontSize: 16, textAlign: 'center', paddingHorizontal: 10 },
});
