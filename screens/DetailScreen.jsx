import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function DetailScreen({ route, navigation }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.description}>
        Ini adalah deskripsi makanan {item.title}. Rasanya enak dan cocok untuk kamu coba!
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Kembali</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  image: { width: '100%', height: 200, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  category: { fontSize: 16, color: '#4e7fff', marginBottom: 4 },
  date: { fontSize: 12, color: '#999', marginBottom: 20 },
  description: { fontSize: 16, lineHeight: 22, marginBottom: 30 },
  button: {
    backgroundColor: '#4e7fff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
