import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';


const RegisterHomeScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

    // Función para manejar el registro
    const handleRegister = async () => {
      if (!email || !password) {
        Alert.alert('Error', 'Por favor, completa todos los campos.');
        return;
      }
  
      if (!agreeToTerms) {
        Alert.alert('Error', 'Debes aceptar los términos y condiciones.');
        return;
      }
  
      try {
        // Crear usuario en Firebase Authentication
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Éxito', 'Usuario registrado exitosamente.');
        router.push('/register/register');
      } catch (error: any) {
        // Manejo de errores
        let errorMessage = 'Algo salió mal. Inténtalo de nuevo.';
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'Este correo ya está registrado.';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'El correo electrónico no es válido.';
        }
        Alert.alert('Error', errorMessage);
      }
    };

  return (
    <View style={styles.container}>
      {/* Botón de "Volver" */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>

      {/* Título y descripción */}
      <Text style={styles.title}>Registrarse</Text>
      <Text style={styles.subtitle}>
        Crea una cuenta para empezar a promocionar tus servicios con el mundo!
      </Text>

      {/* Campo de correo electrónico */}
      <Text style={styles.inputText}>Correo electrónico</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="correo@gmail.com"
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
        <Ionicons name="eye-outline" size={20} color="gray" style={styles.iconRight} />
      </View>

      {/* Aceptar términos y condiciones */}
      <View style={styles.termsContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setAgreeToTerms(!agreeToTerms)}
        >
          <Ionicons
            name={agreeToTerms ? "checkbox-outline" : "square-outline"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
        <Text style={styles.termsText}>
          Al continuar, acepta nuestro{' '}
          <Text style={styles.linkText} onPress={() => console.log('Acuerdo de usuario')}>
            Acuerdo de usuario
          </Text>{' '}
          y reconoce que comprende la{' '}
          <Text style={styles.linkText} onPress={() => console.log('Política de privacidad')}>
            Política de privacidad
          </Text>.
        </Text>
      </View>

      {/* Botón de registro */}
      <TouchableOpacity
  style={styles.registerButton}
  onPress={handleRegister}
>
  <Text style={styles.registerButtonText}>Registrarse</Text>
</TouchableOpacity>


      {/* Separador */}
      <View style={styles.separatorContainer}>
        <View style={styles.line} />
        <View style={styles.circle} />
        <View style={styles.line} />
      </View>

      {/* Botones de inicio de sesión social */}
      <TouchableOpacity style={styles.socialButton} onPress={() => console.log('Registrarse con Google')}>
        <Ionicons name="logo-google" size={22} />
        <Text style={styles.socialButtonText}>Registrarse con Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialButton]} onPress={() => console.log('Registrarse con Facebook')}>
        <Ionicons name="logo-facebook" size={22} />
        <Text style={styles.socialButtonText}>Registrarse con Facebook</Text>
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
  iconRight: {
    marginLeft: 10,
  },
  inputText: {
    color: '#1E293B',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 8,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  termsText: {
    fontSize: 12,
    color: 'gray',
    flex: 1,
  },
  linkText: {
    color: '#6C63FF',
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 15,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 20,
    height: 52,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 6,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D5DB',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5, // Hace el círculo redondo
    borderColor: 'gray',
    borderWidth: 2,
    marginHorizontal: 10, // Espaciado entre la línea y el círculo
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

export default RegisterHomeScreen;
