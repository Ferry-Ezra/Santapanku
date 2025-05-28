import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

const API_URL = 'https://6835be02cd78db2058c2f3cb.mockapi.io/api/dataMakanan';

export default function FormScreen({ navigation, route }) {
  const foodData = route.params?.foodData;
  const onAdd = route.params?.onAdd;
  const onUpdate = route.params?.onUpdate;

  const [title, setTitle] = useState(foodData?.title || '');
  const [category, setCategory] = useState(foodData?.category || 'Food');
  const [imageUrl, setImageUrl] = useState(foodData?.image || '');
  const [price, setPrice] = useState(foodData?.price ? String(foodData.price) : '');

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const submitHandler = async () => {
    if (!title || !price || !imageUrl) {
      alert('Mohon isi semua data termasuk gambar');
      return;
    }

    const newItem = {
      title,
      category,
      image: imageUrl,
      date: foodData?.date || getTodayDate(),
      price: Number(price),
      description: `${title} adalah makanan kategori ${category}`,
    };

    try {
      let response;
      if (foodData && foodData.id && onUpdate) {
        response = await fetch(`${API_URL}/${foodData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem),
        });
        const updated = await response.json();
        onUpdate(updated);
      } else {
        response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem),
        });
        const created = await response.json();
        if (onAdd) onAdd(created);
      }
      navigation.goBack();
    } catch (error) {
      console.error('Gagal menyimpan:', error.message);
      alert('Terjadi kesalahan saat menyimpan data');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Judul Makanan</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Masukkan judul"
      />

      <Text style={styles.label}>Kategori</Text>
      <View style={styles.categoryContainer}>
        {['Food', 'Drink'].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryButton, category === cat && styles.categorySelected]}
            onPress={() => setCategory(cat)}
          >
            <Text
              style={category === cat ? styles.categoryTextSelected : styles.categoryText}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Harga</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        placeholder="Masukkan harga"
      />

      <Text style={styles.label}>URL Gambar</Text>
      <TextInput
        style={styles.input}
        value={imageUrl}
        onChangeText={setImageUrl}
        placeholder="Masukkan URL gambar"
      />

      {imageUrl !== '' && (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: '100%', height: 200, marginVertical: 10, borderRadius: 10 }}
          resizeMode="cover"
        />
      )}

      <TouchableOpacity style={styles.button} onPress={submitHandler}>
        <Text style={styles.buttonText}>{foodData ? 'Update' : 'Tambah'} Makanan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  categoryButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  categorySelected: {
    backgroundColor: 'blue',
  },
  categoryText: {
    color: '#000',
  },
  categoryTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'blue',
    padding: 16,
    marginTop: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
