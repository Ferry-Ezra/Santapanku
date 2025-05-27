import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const pesananData = [
  {
    id: '1',
    nama: 'Nasi Goreng Spesial',
    tanggal: '25 Mei 2025',
    status: 'Diproses',
    gambar: require('../assets/nasigoreng.png'), // Pastikan gambar ini ada
  },
];

export default function PesananScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Status Pesanan</Text>
      <FlatList
        data={pesananData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.gambar} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.nama}>{item.nama}</Text>
              <Text style={styles.tanggal}>Tanggal: {item.tanggal}</Text>
              <Text style={[styles.status, getStatusStyle(item.status)]}>
                {getStatusIcon(item.status)} {item.status}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const getStatusStyle = (status) => {
  switch (status) {
    case 'Selesai': 
      return { color: 'green' };
    case 'Diproses':
      return { color: 'orange' };
    case 'Dibatalkan':
      return { color: 'red' };
    default:
      return { color: 'black' };
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'Selesai':
      return '✅';
    case 'Diproses':
      return '🔄';
    case 'Dibatalkan':
      return '❌';
    default:
      return '';
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#ccc',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  image: { width: 60, height: 60, borderRadius: 10, marginRight: 12 },
  info: { flex: 1 },
  nama: { fontSize: 16, fontWeight: '600' },
  tanggal: { fontSize: 14, color: '#666', marginTop: 4 },
  status: { fontSize: 14, marginTop: 6 },
});