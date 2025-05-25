import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function FoodCard({ image, category, title, date }) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardCategory}>{category}</Text>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDate}>{date}</Text>
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
  },
  cardImage: {
    width: 100,
    height: 100,
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  cardCategory: {
    color: '#4e7fff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardDate: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },
});
