import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { addDoc, collection, getFirestore, updateDoc, doc } from '@react-native-firebase/firestore';

export default function FormScreen({ navigation, route }) {
  const foodData = route.params?.foodData;
  const onAdd = route.params?.onAdd;
  const onUpdate = route.params?.onUpdate;

  const [title, setTitle] = useState(foodData?.title || '');
  const [category, setCategory] = useState(foodData?.category || 'Food');
  const [imageUrl, setImageUrl] = useState(foodData?.image || '');
  const [price, setPrice] = useState(foodData?.price ? String(foodData.price) : '');
  const [loading, setLoading] = useState(false);

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleImagePick = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 1920,
        height: 1080,
        cropping: true,
      });

      let filename = image.path.substring(image.path.lastIndexOf('/') + 1);
      const extension = filename.split('.').pop();
      const name = filename.split('.').slice(0, -1).join('.');
      filename = name + Date.now() + '.' + extension;

      const formData = new FormData();
      formData.append('file', {
        uri: image.path,
        type: `image/${extension}`,
        name: filename,
      });

      setLoading(true);
      const res = await fetch('https://backend-file-praktikum.vercel.app/upload/', {
        method: 'POST',
        body: formData,
      });

      if (res.status !== 200) {
        throw new Error('Upload gagal');
      }

      const { url } = await res.json();
      setImageUrl(url);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Image upload error:', error.message);
      Alert.alert('Gagal upload gambar', error.message);
    }
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
      createdAt: new Date(),
    };

    const db = getFirestore();
    const menuRef = collection(db, 'blog');

    try {
      setLoading(true);

      if (foodData?.id && onUpdate) {
        const itemDoc = doc(db, 'blog', foodData.id);
        await updateDoc(itemDoc, newItem);
        onUpdate({ ...newItem, id: foodData.id });
      } else {
        const docRef = await addDoc(menuRef, newItem);
        onAdd?.({ ...newItem, id: docRef.id });
      }

      setLoading(false);
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      console.error('Gagal menyimpan:', error.message);
      Alert.alert('Terjadi kesalahan saat menyimpan data');
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
            <Text style={category === cat ? styles.categoryTextSelected : styles.categoryText}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Harga</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
        placeholder="Masukkan harga"
      />

      <Text style={styles.label}>Gambar</Text>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.imagePreview} />
      ) : null}
      <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
        <Text style={styles.imageButtonText}>Pilih Gambar</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <TouchableOpacity style={styles.submitButton} onPress={submitHandler}>
          <Text style={styles.submitButtonText}>Simpan</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  categorySelected: {
    backgroundColor: '#4e7fff',
    borderColor: '#4e7fff',
  },
  categoryText: {
    color: '#333',
  },
  categoryTextSelected: {
    color: '#fff',
  },
  imageButton: {
    backgroundColor: '#4e7fff',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  imageButtonText: {
    color: '#fff',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 6,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
