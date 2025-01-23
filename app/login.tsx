import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../config/firebase';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        router.replace('/profilemomentaneo');
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Inicio de sesión exitoso', `Bienvenido, ${userCredential.user.email}`);
      setUser(userCredential.user);
      router.replace('/profilemomentaneo');
    } catch (error) {
      Alert.alert('Error', error.message || 'Ocurrió un error al iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Botón de "Volver" */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Iniciar Sesión</Text>
      <Text style={styles.subtitle}>Bienvenido/a de nuevo! Por favor inicia sesión para continuar</Text>

      {/* Campo de correo electrónico */}
      <Text style={styles.inputText}>Correo electrónico</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="correoprueba@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Campo de contraseña */}
      <Text style={styles.inputText}>Contraseña</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="**********"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Recordarme */}
      <View style={styles.rememberMeContainer}>
        <TouchableOpacity style={styles.checkbox} onPress={() => setRememberMe(!rememberMe)}>
          <Ionicons
            name={rememberMe ? 'checkbox-outline' : 'square-outline'}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
        <Text style={styles.rememberMeText}>Recordarme durante 30 días</Text>
      </View>

      {/* Botón de inicio de sesión */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
        <Ionicons name="arrow-forward-outline" size={20} color="white" style={styles.iconRight} />
      </TouchableOpacity>

      {/* Enlaces adicionales */}
      <View style={styles.linksContainer}>
        <View style={styles.linkRow}>
          <Text style={styles.link}>¿No tienes una cuenta aún? </Text>
          <TouchableOpacity onPress={() => console.log('Registrarse')}>
            <Text style={styles.linkText}>Regístrate</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => console.log('Olvidé mi contraseña')}>
          <Text style={styles.linkText}>Olvidé mi contraseña</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separatorContainer}>
        <View style={styles.line} />
        <View style={styles.circle} />
        <View style={styles.line} />
      </View>

      {/* Botones de inicio de sesión social */}
      <TouchableOpacity style={styles.socialButton} onPress={() => console.log('Iniciar sesión con Google')}>
        <Ionicons name="logo-google" size={22} />
        <Text style={styles.socialButtonText}>Iniciar sesión con Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialButton]} onPress={() => console.log('Iniciar sesión con Facebook')}>
        <Ionicons name="logo-facebook" size={22} />
        <Text style={styles.socialButtonText}>Iniciar sesión con Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputText: {
    color: '#1E293B',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: 'gray',
    borderRadius: 24,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  loginButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 15,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 20,
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  checkbox: {
    marginRight: 10,
  },
  rememberMeText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
  linksContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  linkText: {
    color: '#6C63FF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D5DB',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 2,
    marginHorizontal: 10,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderWidth: 0.8,
    borderColor: 'gray',
    height: 52,
    borderRadius: 24,
    paddingVertical: 15,
    marginBottom: 10,
  },
  socialButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default LoginScreen;
