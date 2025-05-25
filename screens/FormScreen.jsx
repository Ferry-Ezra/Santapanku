import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const localImages = {
  makanan1: require('../assets/images/makanan1.png'),
  makanan2: require('../assets/images/makanan2.png'),
  makanan3: require('../assets/images/makanan3.png'),
};

export default function FormScreen({ navigation, route }) {
  const foodData = route.params?.foodData;
  const onAdd = route.params?.onAdd;
  const onUpdate = route.params?.onUpdate;

  const [title, setTitle] = useState(foodData ? foodData.title : '');
  const [category, setCategory] = useState(foodData ? foodData.category : 'Food');
  const [selectedImageKey, setSelectedImageKey] = useState(foodData ? getKeyByValue(localImages, foodData.image) || 'makanan1' : 'makanan1');
  const [date, setDate] = useState(foodData ? foodData.date : '');
  const [price, setPrice] = useState(foodData ? String(foodData.price) : '');

  // Fungsi untuk cari key berdasarkan value (require image)
  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  const submitHandler = () => {
    if (!title || !date || !price) {
      alert('Mohon isi semua data termasuk harga');
      return;
    }
    const newItem = {
      id: foodData ? foodData.id : Math.random().toString(),
      title,
      category,
      image: localImages[selectedImageKey],
      date,
      price: Number(price),
    };

    if (foodData && onUpdate) {
      onUpdate(newItem);
    } else if (onAdd) {
      onAdd(newItem);
    }
    navigation.goBack();
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
        {['Food', 'Drink'].map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryButton, category === cat && styles.categorySelected]}
            onPress={() => setCategory(cat)}
          >
            <Text style={category === cat ? styles.categoryTextSelected : styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Pilih Gambar</Text>
      <View style={styles.imagePickerContainer}>
        {Object.keys(localImages).map(key => (
          <TouchableOpacity
            key={key}
            onPress={() => setSelectedImageKey(key)}
            style={selectedImageKey === key ? styles.imageSelected : null}
          >
            <Image source={localImages[key]} style={styles.imageThumb} />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Tanggal</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Harga (Rp)</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        placeholder="Masukkan harga"
      />

      <TouchableOpacity style={styles.submitButton} onPress={submitHandler}>
        <Text style={styles.submitText}>{foodData ? 'Update Data' : 'Tambah Data'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { marginTop: 20, fontWeight: 'bold', fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginTop: 6,
  },
  categoryContainer: { flexDirection: 'row', marginTop: 10 },
  categoryButton: {
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#4e7fff',
    borderRadius: 6,
  },
  categorySelected: {
    backgroundColor: '#4e7fff',
  },
  categoryText: {
    color: '#4e7fff',
  },
  categoryTextSelected: {
    color: 'white',
  },
  imagePickerContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  imageThumb: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 6,
  },
  imageSelected: {
    borderWidth: 2,
    borderColor: '#4e7fff',
    borderRadius: 8,
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: '#4e7fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
