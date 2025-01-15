import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/images/wave.png')} 
      style={styles.background}
      resizeMode="cover" 
    >
      <View style={styles.container}>
        <Image source={require('../assets/images/iniciologo.png')} style={styles.logo} />
        <Text style={styles.title}>Bienvenido/a ProFind</Text>
        <Text style={styles.subtitle}>Busca a miles de profesionales en tu zona</Text>

        <TouchableOpacity style={styles.buttonlogin} onPress={() => router.push('/login')}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonregister} onPress={() => router.push('/register')}>
          <Text style={styles.buttonTextRegister}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  logo: {
    height: 300,
    width: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 13,
    color: '#8B8B8B',
    marginBottom: 10,
  },
  buttonlogin: {
    backgroundColor: '#4F46E5',
    width: 300,
    height: 50,
    marginTop: 80,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: '#8B8B8B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonregister: {
    backgroundColor: '#FFF',
    width: 300,
    height: 50,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: '#8B8B8B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonTextRegister: {
    color: '#000',
    fontSize: 16,
  },
});

export default HomeScreen;
