
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';

const HomeScreen = () => {
  const router = useRouter();


 
  return (
    <ImageBackground
      source={require('../assets/images/fondo5.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image source={require('../assets/images/iniciologo.png')} style={styles.logo} />
        <Text style={[styles.title]}>Bienvenido/a ProFind</Text>
        <Text style={[styles.subtitle]}>Busca a miles de profesionales en tu zona</Text>

        <TouchableOpacity style={styles.buttonlogin} onPress={() => router.push('/login')}>
          <Text style={[styles.buttonText]}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonregister} onPress={() => router.push('/register/home')}>
          <Text style={[styles.buttonTextRegister]}>Regístrate</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  logo: {
    height: 250,
    width: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4F46E5',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#adadad',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonlogin: {
    backgroundColor: '#4F46E5',
    width: 280,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonregister: {
    backgroundColor: '#FFF',
    width: 280,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e7e7e7',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextRegister: {
    color: '#4e4e4e',
    fontSize: 16,
  },
});

export default HomeScreen;

