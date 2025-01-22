import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, firestore, storage } from '../../firebaseConfig';

const UploadID = () => {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [rut, setRut] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert('Error', 'Por favor, selecciona una imagen.');
      return null;
    }

    try {
      setUploading(true);
      const userId = auth.currentUser?.uid;
      if (!userId) {
        Alert.alert('Error', 'No se pudo obtener el usuario actual. Inténtalo de nuevo.');
        return null;
      }

      const response = await fetch(image);
      const blob = await response.blob();

      const imageRef = ref(storage, `users/${userId}/carnet.jpg`);
      await uploadBytes(imageRef, blob);

      const imageUrl = await getDownloadURL(imageRef);
      setUploading(false);
      return imageUrl;
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      Alert.alert('Error', 'No se pudo subir la imagen. Inténtalo más tarde.');
      setUploading(false);
      return null;
    }
  };

  const handleContinue = async () => {
    if (!nombre || !apellido || !rut || !fechaNacimiento || !telefono) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        Alert.alert('Error', 'No se pudo obtener el usuario actual. Inténtalo de nuevo.');
        return;
      }

      const imageUrl = await uploadImage();
      if (!imageUrl) return;

      const userDocRef = doc(firestore, 'users', userId);
      await setDoc(userDocRef, {
        nombre,
        apellido,
        rut,
        fechaNacimiento,
        telefono,
        imageUrl, // URL de la imagen subida
        registrationStep: 2,
      });

      router.push('/register/profiletype');
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      Alert.alert('Error', 'No se pudieron guardar los datos. Inténtalo más tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Registrarse</Text>
      <Text style={styles.subtitle}>
        Crea una cuenta para empezar a promocionar tus servicios con el mundo!
      </Text>

      <Text style={styles.inputLabel}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Juan"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.inputLabel}>Apellido</Text>
      <TextInput
        style={styles.input}
        placeholder="Perez"
        value={apellido}
        onChangeText={setApellido}
      />

      <Text style={styles.inputLabel}>RUT</Text>
      <TextInput
        style={styles.input}
        placeholder="12.345.678-9"
        value={rut}
        onChangeText={setRut}
      />

      <Text style={styles.inputLabel}>Fecha de nacimiento</Text>
      <TextInput
        style={styles.input}
        placeholder="12/12/2000"
        value={fechaNacimiento}
        onChangeText={setFechaNacimiento}
        keyboardType="number-pad"
      />

      <Text style={styles.inputLabel}>Teléfono</Text>
      <TextInput
        style={styles.input}
        placeholder="912345678"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>Seleccionar imagen</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinue}
        disabled={uploading}
      >
        <Text style={styles.continueButtonText}>
          {uploading ? 'Subiendo...' : 'Continuar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 60,
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
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1E293B',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 14,
    color: '#1E293B',
  },
  imagePicker: {
    backgroundColor: '#4F46E5',
    paddingVertical: 10,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 10,
  },
  imagePickerText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 10,
  },
  continueButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 15,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 20,
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

export default UploadID;
