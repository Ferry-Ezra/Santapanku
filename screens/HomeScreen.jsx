import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import FoodCard from '../components/FoodCard';

const categories = ['Popular', 'Food', 'Drink'];

const data = [
  {
    id: '1',
    category: 'Food',
    title: 'Jelajah Kuliner Indonesia',
    date: 'May 25, 2025',
    image: require('../assets/nasigoreng.png'),
  },
  {
    id: '2',
    category: 'Food',
    title: 'Petualangan Rasa: Nasi Goreng',
    date: 'May 20, 2025',
    image: require('../assets/ayamgoreng.png'),
  },
  {
    id: '3',
    category: 'Drink',
    title: 'Makanan Tradisional yang enak : Soto Ayam',
    date: 'May 18, 2025',
    image: require('../assets/sotoayam.png'),
  },
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Popular');
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  // Filter data saat category atau search berubah
  useEffect(() => {
    let filtered = data;

    if (selectedCategory !== 'Popular') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (search.trim() !== '') {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [selectedCategory, search]);

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
        {categories.map(cat => (
          <TouchableOpacity key={cat} onPress={() => setSelectedCategory(cat)}>
            <Text style={[styles.tabText, selectedCategory === cat && styles.activeTab]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <FoodCard
            image={item.image}
            category={item.category}
            title={item.title}
            date={item.date}
          />
        )}
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
});
