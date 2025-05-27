import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function FoodCard({ image, category, title, date, price, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.cardImage} />

      <View style={styles.cardContent}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.price}>Rp {price.toLocaleString()}</Text>

        <View style={styles.actions}>
          {onEdit && (
            <TouchableOpacity style={styles.editButton} onPress={onEdit}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <Text style={styles.deleteText}>Hapus</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  cardImage: {
    width: 100,
    height: 100,
  },
  cardContent: {
    flex: 1,
    padding: 12,
  },
  category: {
    color: '#4e7fff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  date: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },
  price: {
    marginTop: 6,
    fontWeight: 'bold',
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  editButton: {
    marginRight: 10,
    backgroundColor: '#4e7fff',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  editText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
