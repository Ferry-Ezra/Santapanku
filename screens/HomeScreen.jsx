import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';

const categories = ['Favorit ', 'Menu Terbaru', 'Makanan ', 'Minuman '];

const data = [
  {
    id: '1',
    category: 'Makanan',
    title: 'Jelajah Kuliner Indonesia',
    date: 'May 25, 2025',
    image: require('../assets/nasigoreng.png'),
  },
  {
    id: '2',
    category: 'Makanan',
    title: 'Petualangan Rasa: Nasi Goreng',
    date: 'May 20, 2025',
    image: require('../assets/ayamgoreng.png'),
  },
  {
    id: '3',
    category: 'Makanan',
    title: 'Makanan Tradisional yang enak : Soto Ayam',
    date: 'May 18, 2025',
    image: require('../assets/sotoayam.png'),
  },
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Popular');
  const [search, setSearch] = useState('');

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardCategory}>{item.category}</Text>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDate}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Santapanku</Text>

      <TextInput
        placeholder="Cari makanan favoritmu..."
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        {categories.map((cat) => (
          <TouchableOpacity key={cat} onPress={() => setSelectedCategory(cat)}>
            <Text style={[styles.tabText, selectedCategory === cat && styles.activeTab]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={data.filter(item => item.category.includes(selectedCategory) || selectedCategory === 'Popular')}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 40 },
  logo: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 10,
  },
  tabContainer: { flexDirection: 'row', marginBottom: 16 },
  tabText: {
    marginRight: 16,
    fontSize: 16,
    color: '#888',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#4e7fff',
    color: '#fff',
  },
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
