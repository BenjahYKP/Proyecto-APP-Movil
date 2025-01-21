import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import CountryPicker from '../../components/countryPicker';
import BirthDatePicker from '../../components/birthDatePicker';
import GenderPicker from '../../components/genderPicker';

const EditProfileScreen = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: 'Penny',
    lastName: 'Parker',
    rut: '12.345.678-9',
    birthDate: new Date(1990, 0, 1),
    username: 'pennyparker',
    email: 'p_parker1@gmail.com',
    phone: '123-456-7890',
    country: 'Chile',
    gender: 'Femenino',
    address: 'P. Sherman, calle Wallaby, 42, Sydney',
  });

  const handleInputChange = (field: string, value: string | Date) => {
    setForm({ ...form, [field]: value });
  };

  //backend aqui
  const handleSave = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
    console.log('Datos guardados:', form);
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Ionicons name="arrow-back-outline" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Perfil</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.row}>
          <View style={[styles.inputContainer, styles.halfWidth]}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              value={form.firstName}
              onChangeText={(text) => handleInputChange('firstName', text)}
            />
          </View>
          <View style={[styles.inputContainer, styles.halfWidth]}>
            <Text style={styles.label}>Apellido</Text>
            <TextInput
              style={styles.input}
              value={form.lastName}
              onChangeText={(text) => handleInputChange('lastName', text)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>RUT</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={form.rut}
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fecha de Nacimiento</Text>
          <BirthDatePicker
            selectedDate={form.birthDate}
            onSelect={(date) => handleInputChange('birthDate', date)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={form.email}
            keyboardType="email-address"
            onChangeText={(text) => handleInputChange('email', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            value={form.phone}
            keyboardType="phone-pad"
            onChangeText={(text) => handleInputChange('phone', text)}
          />
        </View>
        <View style={styles.row}>
          <View style={[styles.inputContainer, styles.halfWidth]}>
            <Text style={styles.label}>País</Text>
            <CountryPicker
              selectedCountry={form.country}
              onSelect={(country) => handleInputChange('country', country)}
            />
          </View>
          <View style={[styles.inputContainer, styles.halfWidth]}>
            <Text style={styles.label}>Género</Text>
            <GenderPicker
              selectedGender={form.gender}
              onSelect={(gender) => handleInputChange('gender', gender)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Dirección</Text>
          <TextInput
            style={styles.input}
            value={form.address}
            onChangeText={(text) => handleInputChange('address', text)}
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>GUARDAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 16,
  },
  content: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  disabledInput: {
    backgroundColor: '#F3F4F6',
    color: '#9CA3AF',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  saveButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditProfileScreen;

