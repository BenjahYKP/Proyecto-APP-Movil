import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { doc, updateDoc } from 'firebase/firestore'; // Importa updateDoc
import { auth, firestore } from '../../config/firebase'; // Asegúrate de tener bien configurado tu Firestore y Auth

const ServicePricingScreen = () => {
  const router = useRouter();
  const [price, setPrice] = useState('');

  const handleContinue = async () => {
    if (!price) {
      Alert.alert('Error', 'Por favor, ingrese el precio del servicio.');
      return;
    }

    try {
      const userId = auth.currentUser?.uid; // Obtén el ID del usuario autenticado
      if (!userId) {
        Alert.alert('Error', 'No se pudo identificar al usuario.');
        return;
      }

      // Actualiza el campo 'servicePrice' en el documento del usuario
      const userDocRef = doc(firestore, 'users', userId);
      await updateDoc(userDocRef, {
        servicePrice: price,
      });

      Alert.alert('Éxito', 'Precio registrado correctamente');
      router.push('/register/finishregister');
    } catch (error) {
      console.error('Error al registrar el precio:', error);
      Alert.alert('Error', 'Hubo un problema al registrar el precio. Inténtalo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Botón Back */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>¿Cuál es el precio del servicio a ofrecer?</Text>
      <Image source={require('../../assets/images/money.png')} style={styles.image} />

      {/* Input Precio */}
      <TextInput
        style={styles.input}
        placeholder="$"
        value={price}
        onChangeText={setPrice}
      />

      {/* Botón Continuar */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continuar</Text>
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
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 24,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 15,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 6,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 8,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default ServicePricingScreen;
