import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileMenuItem = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.menuItemIcon}>
      <Ionicons name={icon} size={24} color="#4e7fff" />
    </View>
    <Text style={styles.menuItemText}>{title}</Text>
    <Ionicons name="chevron-forward-outline" size={22} color="#999" />
  </TouchableOpacity>
);

export default function ProfileScreen() {
  // State data user
  const [user, setUser] = useState({
    name: 'Santapanku User',
    email: 'user@santapanku.com',
    bio: 'Pecinta kuliner sejati. Suka mencoba berbagai makanan khas Indonesia.',
    avatar: require('../assets/ayamgoreng.png'),
  });

  // State untuk mode edit (on/off)
  const [isEditing, setIsEditing] = useState(false);

  // State sementara untuk form edit
  const [formData, setFormData] = useState(user);

  // Tombol Simpan
  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  // Tombol Batal
  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>

          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <Image source={user.avatar} style={styles.avatar} />

            {isEditing ? (
              <>
                <TextInput
                  style={styles.inputName}
                  value={formData.name}
                  onChangeText={(text) => setFormData({...formData, name: text})}
                  placeholder="Nama"
                />
                <TextInput
                  style={styles.inputEmail}
                  value={formData.email}
                  onChangeText={(text) => setFormData({...formData, email: text})}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  style={[styles.inputBio, { height: 80 }]}
                  value={formData.bio}
                  onChangeText={(text) => setFormData({...formData, bio: text})}
                  placeholder="Deskripsi"
                  multiline
                />
              </>
            ) : (
              <>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
                <Text style={styles.userBio}>{user.bio}</Text>
              </>
            )}
          </View>

          {/* Menu atau tombol Simpan/Batal */}
          {isEditing ? (
            <View style={styles.editButtonsContainer}>
              <TouchableOpacity style={[styles.editButton, {backgroundColor: '#4e7fff'}]} onPress={handleSave}>
                <Text style={styles.editButtonText}>Simpan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.editButton, {backgroundColor: '#999'}]} onPress={handleCancel}>
                <Text style={styles.editButtonText}>Batal</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.menuWrapper}>
              <ProfileMenuItem 
                icon="person-circle-outline" 
                title="Edit Profil" 
                onPress={() => setIsEditing(true)} 
              />
              <ProfileMenuItem 
                icon="information-circle-outline" 
                title="Tentang Aplikasi" 
                onPress={() => alert('Santapanku App v1.0')} 
              />
              <ProfileMenuItem 
                icon="log-out-outline" 
                title="Keluar" 
                onPress={() => alert('Fitur Keluar akan datang!')} 
              />
            </View>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f7fb' },
  container: { padding: 20 },
  profileHeader: { alignItems: 'center', marginBottom: 30 },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#4e7fff',
    marginBottom: 16,
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4e7fff',
  },
  userEmail: {
    fontSize: 16,
    color: '#4e7fff',
    marginBottom: 12,
  },
  userBio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  menuWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e6edff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  inputName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4e7fff',
    borderBottomWidth: 2,
    borderBottomColor: '#4e7fff',
    marginBottom: 12,
    width: '80%',
    textAlign: 'center',
  },
  inputEmail: {
    fontSize: 16,
    color: '#4e7fff',
    borderBottomWidth: 1,
    borderBottomColor: '#4e7fff',
    marginBottom: 12,
    width: '80%',
    textAlign: 'center',
  },
  inputBio: {
    fontSize: 16,
    color: '#666',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    width: '80%',
    textAlignVertical: 'top',
  },
  editButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  editButton: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 8,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
