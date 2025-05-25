import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import FoodCard from '../components/FoodCard';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([
    {
      id: '1',
      title: 'Nasi Goreng',
      category: 'Food',
      image: require('../assets/images/makanan1.png'),
      date: '2024-05-25',
      price: 25000,
    },
    {
      id: '2',
      title: 'Es Teh Manis',
      category: 'Drink',
      image: require('../assets/images/makanan2.png'),
      date: '2024-05-26',
      price: 10000,
    },
  ]);

  const addNewFood = (newFood) => {
    setData(prev => [newFood, ...prev]);
  };

  const updateFood = (updatedFood) => {
    setData(prev => prev.map(item => (item.id === updatedFood.id ? updatedFood : item)));
  };

  const deleteFood = (id) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <FoodCard
      {...item}
      onEdit={() => navigation.navigate('Form', { foodData: item, onUpdate: updateFood })}
      onDelete={() => deleteFood(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Form', { onAdd: addNewFood })}
      >
        <Text style={styles.addButtonText}>+ Tambah Makanan</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  addButton: {
    backgroundColor: '#4e7fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  addButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
