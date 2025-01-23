import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const RegistrationCompleteScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Imagen de confirmación */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/city.png')} 
          style={styles.image}
        />
      </View>

      {/* Mensaje de confirmación */}
      <Text style={styles.title}>¡Registro completado!</Text>
      <Text style={styles.subtitle}>Gracias por completar tu registro. Ya puedes empezar a ofrecer o contratar servicios.</Text>

      {/* Botón para volver al inicio */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => router.push('/profilemomentaneo')} // Cambia esta ruta según la pantalla de inicio de tu app
      >
        <Text style={styles.continueButtonText}>Ir al Inicio</Text>
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
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 30,
  },
  image: {
    width: 400,
    height: 400,
    borderRadius: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  continueButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 15,
    borderRadius: 24,
    alignItems: 'center',
    width: '80%',
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
    fontWeight: 'bold',
  },
});

export default RegistrationCompleteScreen;
