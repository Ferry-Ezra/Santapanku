import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';

const API_URL = 'https://6835be02cd78db2058c2f3cb.mockapi.io/api/dataMakanan';

const categories = ['Popular', 'Food', 'Drink'];

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [category, setCategory] = useState('Popular');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      setData(json);
    } catch (error) {
      alert('Gagal load data: ' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = data;
    if (category !== 'Popular') {
      filtered = filtered.filter(item => item.category === category);
    }
    if (search.trim() !== '') {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredData(filtered);
  }, [data, category, search]);

  const onAdd = (newItem) => {
    setData(prev => [newItem, ...prev]);
  };

  const onUpdate = (updatedItem) => {
    setData(prev => prev.map(item => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const onDelete = (id) => {
    Alert.alert(
      'Konfirmasi',
      'Apakah anda yakin ingin menghapus?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
              setData(prev => prev.filter(item => item.id !== id));
            } catch (error) {
              alert('Gagal hapus data: ' + error.message);
            }
            setLoading(false);
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ flex: 1, paddingLeft: 10 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.categoryText}>{item.category}</Text>
        <Text style={styles.price}>Rp {item.price.toLocaleString()}</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() =>
            navigation.navigate('Form', {
              foodData: item,
              onUpdate: onUpdate,
            })
          }
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => onDelete(item.id)}
        >
          <Text style={styles.buttonText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Memuat data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Form', { onAdd })}
      >
        <Text style={styles.addButtonText}>+ Tambah Makanan</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Cari makanan..."
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.tabContainer}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.tab, category === cat && styles.activeTab]}
            onPress={() => setCategory(cat)}
          >
            <Text style={[styles.tabText, category === cat && styles.activeTabText]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredData.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Tidak ada data</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },

  addButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  searchInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },

  tabContainer: { flexDirection: 'row', marginBottom: 12, justifyContent: 'space-around' },

  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  activeTab: {
    backgroundColor: 'blue',
  },

  tabText: {
    color: '#444',
    fontWeight: '600',
  },
  activeTabText: {
    color: 'white',
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  categoryText: {
    color: 'gray',
    fontSize: 14,
  },
  price: {
    marginTop: 6,
    fontWeight: '600',
    color: 'black',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 6,
  },
  editButton: {
    backgroundColor: 'orange',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
