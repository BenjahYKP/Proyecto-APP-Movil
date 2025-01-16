import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={styles.container}>
      {/* Botón de "Volver" */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Iniciar Sesión</Text>
      <Text style={styles.subtitle}>Bienvenido/a de nuevo! Por favor inicia sesión para continuar</Text>

      {/* Campo de correo electrónico */}
      <Text>Correo electrónico</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="gray" style={styles.icon} />
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
      <Text>Contraseña</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="**********"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Ionicons name="eye-outline" size={20} color="gray" style={styles.iconRight} />
      </View>

      {/* Recordarme */}
      <View style={styles.rememberMeContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <Ionicons
            name={rememberMe ? "checkbox-outline" : "square-outline"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
        <Text style={styles.rememberMeText}>Recordarme durante 30 días</Text>
      </View>

      {/* Botón de inicio de sesión */}
      <TouchableOpacity style={styles.loginButton} onPress={() => console.log('Iniciar sesión')}>
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      {/* Enlaces adicionales */}
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => console.log('Registrarse')}>
          <Text style={styles.linkText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Olvidé mi contraseña')}>
          <Text style={styles.linkText}>Olvidé mi contraseña</Text>
        </TouchableOpacity>
      </View>

      {/* Botones de inicio de sesión social */}
      <TouchableOpacity style={styles.socialButton} onPress={() => console.log('Iniciar sesión con Google')}>
        <Ionicons name="logo-google" size={20} color="white" />
        <Text style={styles.socialButtonText}>Iniciar sesión con Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#4267B2' }]} onPress={() => console.log('Iniciar sesión con Facebook')}>
        <Ionicons name="logo-facebook" size={20} color="white" />
        <Text style={styles.socialButtonText}>Iniciar sesión con Facebook</Text>
      </TouchableOpacity>

      {/* Políticas */}
      <View style={styles.policyContainer}>
        <TouchableOpacity onPress={() => console.log('Privacy Policy')}>
          <Text style={styles.policyText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Terms & Conditions')}>
          <Text style={styles.policyText}>Terms & Conditions</Text>
        </TouchableOpacity>
      </View>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
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
  iconRight: {
    marginLeft: 10,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  rememberMeText: {
    color: 'gray',
  },
  loginButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  linkText: {
    color: '#6C63FF',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DB4437',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  socialButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  policyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  policyText: {
    color: 'gray',
    fontSize: 12,
  },
});

export default LoginScreen;
