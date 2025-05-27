// HomeScreen.jsx (full simplified, fokus ke animasi)
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  FlatList,
} from 'react-native';
import FoodCard from '../components/FoodCard';

const categories = ['Popular', 'Food', 'Drink'];

export default function HomeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('Popular');
  const [search, setSearch] = useState('');
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
  const [filteredData, setFilteredData] = useState(data);

  // Tombol tambah animasi
  const addBtnScale = useRef(new Animated.Value(1)).current;
  const addBtnOpacity = useRef(new Animated.Value(1)).current;

  // Fungsi animasi tombol tekan
  const onPressInAdd = () => {
    Animated.parallel([
      Animated.spring(addBtnScale, { toValue: 0.95, useNativeDriver: true }),
      Animated.timing(addBtnOpacity, { toValue: 0.7, duration: 100, useNativeDriver: true }),
    ]).start();
  };
  const onPressOutAdd = () => {
    Animated.parallel([
      Animated.spring(addBtnScale, { toValue: 1, useNativeDriver: true }),
      Animated.timing(addBtnOpacity, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  // Tambah makanan baru
  const addNewFood = (newFood) => {
    setData(prev => [newFood, ...prev]);
  };

  // Update filteredData saat data/filters berubah
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
  }, [selectedCategory, search, data]);

  // Hapus dengan animasi (trigger di FoodCard)
  const handleDelete = (id) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  // Render item dengan animasi muncul
  const renderItem = ({ item, index }) => {
    return (
      <AnimatedFoodCard
        key={item.id}
        item={item}
        index={index}
        onDelete={() => handleDelete(item.id)}
        onEdit={(food) => navigation.navigate('Form', { foodData: food, onUpdate: (updated) => {
          setData(prev => prev.map(d => d.id === updated.id ? updated : d));
        } })}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Animated.View
          style={{
            transform: [{ scale: addBtnScale }],
            opacity: addBtnOpacity,
          }}
        >
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Form', { onAdd: addNewFood })}
            onPressIn={onPressInAdd}
            onPressOut={onPressOutAdd}
          >
            <Text style={styles.addButtonText}>+ Tambah Makanan</Text>
          </TouchableOpacity>
        </Animated.View>

        <TextInput
          placeholder="Cari makanan favoritmu..."
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.tabContainer}>
          {categories.map(cat => (
            <TouchableOpacity key={cat} onPress={() => setSelectedCategory(cat)}>
              <Text style={[styles.tabText, selectedCategory === cat && styles.activeTab]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* List dengan animasi */}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 160, paddingBottom: 100 }}
      />
    </View>
  );
}

// FoodCard Animated Wrapper
const AnimatedFoodCard = ({ item, index, onDelete, onEdit }) => {
  const anim = useRef(new Animated.Value(0)).current;
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 500,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleDelete = () => {
    // Animasi fade out dan shrink
    Animated.timing(anim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setIsDeleted(true);
      onDelete();
    });
  };

  if (isDeleted) return null;

  return (
    <Animated.View
      style={{
        opacity: anim,
        transform: [
          {
            translateY: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
          },
          {
            scale: anim,
          },
        ],
      }}
    >
      <FoodCard
        image={item.image}
        category={item.category}
        title={item.title}
        date={item.date}
        price={item.price}
        onDelete={handleDelete}
        onEdit={() => onEdit(item)}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  addButton: {
    backgroundColor: '#4e7fff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 10,
  },
  tabContainer: { flexDirection: 'row', marginBottom: 8 },
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
