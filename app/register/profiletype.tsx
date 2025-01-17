import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const ProfileTypeScreen = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const options = [
    { label: 'Seleccione una opción', value: '' },
    { label: 'Desea ofrecer servicios', value: 'ofrecer' },
    { label: 'Desea contratar servicios', value: 'contratar' },
    { label: 'Ambas', value: 'ambas' },
  ];

  const renderOption = ({ item }: { item: { label: string; value: string } }) => (
    <TouchableOpacity
      style={styles.dropdownOption}
      onPress={() => {
        setSelectedOption(item.value);
        setDropdownVisible(false);
      }}
    >
      <Text style={styles.dropdownOptionText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Tipo de perfil</Text>

      {/* Imagen */}
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/profiletype.png')} style={styles.image} />
      </View>

      {/* Dropdown */}
      <Text style={styles.label}>Preferencia de servicios</Text>
      <TouchableOpacity
        style={styles.dropdownTrigger}
        onPress={() => setDropdownVisible(true)}
      >
        <Text style={styles.dropdownText}>
          {options.find((opt) => opt.value === selectedOption)?.label || 'Seleccione una opción'}
        </Text>
        <Ionicons name="chevron-down" size={20} color="gray" />
      </TouchableOpacity>

      {/* Dropdown Menu */}
      <Modal
        visible={dropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdownMenu}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={renderOption}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Botón Continuar */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          if (selectedOption) {
            router.push('/next-screen' as const);
          } else {
            alert('Por favor, seleccione una opción antes de continuar.');
          }
        }}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

      {/* Ayuda */}
      <TouchableOpacity style={styles.helpContainer} onPress={() => console.log('¿Necesitas ayuda?')}>
        <Text style={styles.helpText}>¿Necesitas ayuda?</Text>
        <Ionicons name="help-circle-outline" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1E293B',
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
  },
  dropdownText: {
    fontSize: 14,
    color: '#6B7280',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownMenu: {
    width: 250,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  dropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dropdownOptionText: {
    fontSize: 14,
    color: '#1E293B',
  },
  continueButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  helpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  helpText: {
    color: 'black',
    fontSize: 14,
    marginRight: 5,
  },
});

export default ProfileTypeScreen;
