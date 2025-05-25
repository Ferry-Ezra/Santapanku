import React, { useState } from "react";
import { 
  View, Text, TextInput, Button, FlatList, Alert, StyleSheet, ScrollView, 
  Image, Modal, TouchableOpacity, ImageBackground 
} from "react-native";

// === Component MenuItem (Menggunakan Props) ===
const MenuItem = ({ item, onPress }) => ( // Props: item dan onPress dikirim dari parent
  <TouchableOpacity style={styles.menuCard} onPress={() => onPress(item)}>
    <ImageBackground source={item.image} style={styles.menuImage} imageStyle={{ borderRadius: 10 }}>
      <View style={styles.overlay}>
        <Text style={styles.menuTitle}>{item.name}</Text>
        <Text style={styles.menuPrice}>Rp {item.price},00</Text>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

const Santapanku = () => {
  // === State untuk menyimpan nilai yang bisa berubah ===
  const [searchText, setSearchText] = useState("");   // State untuk menyimpan teks pencarian
  const [modalVisible, setModalVisible] = useState(false); // State untuk menampilkan modal
  const [selectedItem, setSelectedItem] = useState(null);  // State untuk menyimpan item yang dipilih
  const [totalHarga, setTotalHarga] = useState(0);   // State untuk menyimpan total harga pesanan

  // Data menu makanan
  const daftarMenu = [
    { name: "Nasi Goreng", image: require("./assets/nasigoreng.png"), description: "Nasi goreng spesial dengan bumbu pilihan.", price: 15000 },
    { name: "Ayam Penyet", image: require("./assets/ayamgoreng.png"), description: "Ayam goreng dengan sambal pedas khas.", price: 18000 },
    { name: "Soto Ayam", image: require("./assets/sotoayam.png"), description: "Kuah soto ayam hangat dengan rempah-rempah.", price: 12000 },
    { name: "Gado-Gado", image: require("./assets/gado.png"), description: "Sayuran segar dengan bumbu kacang khas.", price: 10000 },
  ];

  // Filter daftar menu berdasarkan teks pencarian
  const filteredMenu = daftarMenu.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Fungsi untuk menampilkan modal dan menyimpan item yang dipilih
  const showModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // Fungsi untuk menambah total harga saat menambahkan item ke pesanan
  const tambahTotalHarga = (harga) => {
    setTotalHarga((prevTotal) => prevTotal + harga);
  };

  return (
    <View style={styles.container}>
      {/* === Header dengan Input Pencarian === */}
      <View style={styles.header}>
        <Text style={styles.title}>Santapanku</Text>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Cari Menu..." 
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText} // Mengubah state searchText saat input berubah
        />
      </View>

      {/* === List Menu (Menggunakan Props di MenuItem) === */}
      <ScrollView>
        <FlatList
          data={filteredMenu}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <MenuItem item={item} onPress={showModal} />} // Mengirim Props ke MenuItem
        />
      </ScrollView>

      {/* === Total Harga === */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Harga: Rp {totalHarga},00</Text>
      </View>

      {/* === Modal untuk Detail Menu === */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Image source={selectedItem.image} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                <Text style={styles.modalDescription}>{selectedItem.description}</Text>
                <Text style={styles.modalPrice}>Harga: Rp {selectedItem.price},00</Text>
                <Button title="Tambah ke Total" onPress={() => { tambahTotalHarga(selectedItem.price); setModalVisible(false); }} />
                <Button title="Tutup" onPress={() => setModalVisible(false)} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#333" },
  searchInput: { flex: 1, marginLeft: 10, padding: 8, borderRadius: 5, borderWidth: 1, borderColor: "#ccc", backgroundColor: "#fff" },
  menuCard: { marginBottom: 15, borderRadius: 10, overflow: "hidden", elevation: 3 },
  menuImage: { width: "100%", height: 200, justifyContent: "flex-end" },
  overlay: { backgroundColor: "rgba(0,0,0,0.5)", padding: 10 },
  menuTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  menuPrice: { fontSize: 16, color: "#fff" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { width: 300, padding: 20, backgroundColor: "white", borderRadius: 10, alignItems: "center" },
  modalImage: { width: 100, height: 100, marginBottom: 10 },
  modalTitle: { fontSize: 20, fontWeight: "bold" },
  modalDescription: { fontSize: 16, textAlign: "center", marginVertical: 10 },
  modalPrice: { fontSize: 18, fontWeight: "bold", color: "#d32f2f" },
  totalContainer: { padding: 15, backgroundColor: "#fff", alignItems: "center", marginTop: 10, borderRadius: 5 },
  totalText: { fontSize: 18, fontWeight: "bold", color: "#333" }
});	
export default Santapanku;
