import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function FoodCard({ title, category, image, date, price, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text>{category}</Text>
        <Text>{date}</Text>
        <Text style={styles.price}>Rp {price.toLocaleString('id-ID')}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.editBtn}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    elevation: 1,
    alignItems: 'center',
  },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  info: { flex: 1 },
  title: { fontWeight: 'bold', fontSize: 16 },
  price: { fontWeight: 'bold', color: '#4e7fff', marginTop: 4 },
  actions: { flexDirection: 'row' },
  editBtn: { marginRight: 10, padding: 6, backgroundColor: '#d0e1ff', borderRadius: 6 },
  deleteBtn: { padding: 6, backgroundColor: '#ffd0d0', borderRadius: 6 },
  editText: { color: '#2a4d9b', fontWeight: 'bold' },
  deleteText: { color: '#9b2a2a', fontWeight: 'bold' },
});
