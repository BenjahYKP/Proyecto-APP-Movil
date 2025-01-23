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
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, firestore, storage } from '../../config/firebase';

const UploadID = () => {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImageFromLibrary = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhotoWithCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la cámara.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        Alert.alert('Error', 'No se pudo obtener el usuario actual. Inténtalo de nuevo.');
        return;
      }
  
      const imageUrl = await uploadImage();
      if (!imageUrl) return;
  
      const userDocRef = doc(firestore, 'users', userId);
      await updateDoc(userDocRef, {
        imageUrl,
        registrationStep: 3,
      });
  
      router.push('/register/serviceselection');
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

      <TouchableOpacity style={styles.uploadContainer} onPress={pickImageFromLibrary}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <>
            <Ionicons name="person-outline" size={40} color="#4F46E5" />
            <Text style={styles.uploadText}>Seleccionar archivo</Text>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.cameraButton} onPress={takePhotoWithCamera}>
        <Ionicons name="camera" size={20} color="#4F46E5" />
        <Text style={styles.cameraButtonText}>Abrir cámara</Text>
      </TouchableOpacity>

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
  uploadContainer: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    padding: 60,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
  },
  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 15,
    borderRadius: 24,
    marginBottom: 20,
  },
  cameraButtonText: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 10,
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