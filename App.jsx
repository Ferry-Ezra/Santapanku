import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet, ScrollView, Image, Modal, TouchableOpacity, ImageBackground } from "react-native";

const Santapanku = () => {
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [totalHarga, setTotalHarga] = useState(0);

  const daftarMenu = [
    { name: "Nasi Goreng", image: require("./assets/nasigoreng.png"), description: "Nasi goreng spesial dengan bumbu pilihan.", price: 15000 },
    { name: "Ayam Penyet", image: require("./assets/ayamgoreng.png"), description: "Ayam goreng dengan sambal pedas khas.", price: 18000 },
    { name: "Soto Ayam", image: require("./assets/sotoayam.png"), description: "Kuah soto ayam hangat dengan rempah-rempah.", price: 12000 },
    { name: "Gado-Gado", image: require("./assets/gado.png"), description: "Sayuran segar dengan bumbu kacang khas.", price: 10000 },
  ];

  const filteredMenu = daftarMenu.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const showModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Santapanku</Text>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Cari Menu..." 
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <ScrollView>
        <FlatList
          data={filteredMenu}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.menuCard} onPress={() => showModal(item)}>
              <ImageBackground source={item.image} style={styles.menuImage} imageStyle={{ borderRadius: 10 }}>
                <View style={styles.overlay}>
                  <Text style={styles.menuTitle}>{item.name}</Text>
                  <Text style={styles.menuPrice}>Rp {item.price},00</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
      {/* Modal untuk Menampilkan Detail Makanan */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Image source={selectedItem.image} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                <Text style={styles.modalDescription}>{selectedItem.description}</Text>
                <Text style={styles.modalPrice}>Harga: Rp {selectedItem.price},00</Text>
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
  modalPrice: { fontSize: 18, fontWeight: "bold", color: "#d32f2f" }
});

export default Santapanku;
