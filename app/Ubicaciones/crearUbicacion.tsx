import React, { Component } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { auth, firestore } from "../../config/firebase";
import { MaterialIcons } from "@expo/vector-icons";
import Geocoder from "react-native-geocoding";
import { GEOCODER_API_KEY } from "@env";
import { collection, addDoc } from "firebase/firestore";

import {
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  View,
  Text,
} from "react-native";

Geocoder.init(GEOCODER_API_KEY);

export default class Map extends Component {
  state = {
    location: {
      latitude: 0,
      longitude: 0,
    },
    searchQuery: "",
    markerPosition: null as { latitude: number; longitude: number } | null,
    currentLocation: null as { latitude: number; longitude: number } | null,
  };

  private map: MapView | null = null;

  componentDidMount() {
    this.getCurrentLocation();
  }

  getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permiso denegado",
          "La aplicación necesita acceder a tu ubicación para funcionar correctamente."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      this.setState({
        location: { latitude, longitude },
        markerPosition: { latitude, longitude },
        currentLocation: { latitude, longitude },
      });

      this.map?.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      console.error("Error al obtener la ubicación:", error);
      Alert.alert(
        "Error",
        "No se pudo obtener la ubicación. Intenta nuevamente más tarde."
      );
    }
  };

  onSearchLocation = async () => {
    try {
      const { searchQuery } = this.state;

      if (!searchQuery.trim()) {
        Alert.alert("Error", "Por favor, introduce un lugar para buscar.");
        return;
      }

      const result = await Geocoder.from(searchQuery);

      if (result.results.length > 0) {
        const { lat, lng } = result.results[0].geometry.location;

        this.setState({
          location: { latitude: lat, longitude: lng },
          markerPosition: { latitude: lat, longitude: lng },
        });

        this.map?.animateToRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } else {
        Alert.alert("Error", "No se encontró la ubicación especificada.");
      }
    } catch (error) {
      console.error("Error al buscar la ubicación:", error);
      Alert.alert(
        "Error",
        "No se pudo buscar la ubicación. Verifica tu conexión a internet."
      );
    }
  };

  onSaveLocation = async () => {
    const { markerPosition } = this.state;

    if (!markerPosition) {
      Alert.alert("Error", "Por favor, selecciona una ubicación primero.");
      return;
    }

    try {
      // Obtener el UID del usuario autenticado
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Error", "No hay un usuario autenticado.");
        return;
      }

      // Datos a guardar
      const locationData = {
        latitude: markerPosition.latitude,
        longitude: markerPosition.longitude,
        timestamp: new Date(),
        userId: user.uid,
        email: user.email,
      };

      // Guardar en Firestore
      await addDoc(collection(firestore, "locations"), locationData);

      Alert.alert(
        "Ubicación guardada",
        `La ubicación fue guardada exitosamente.\nLatitud: ${markerPosition.latitude}, Longitud: ${markerPosition.longitude}`
      );
    } catch (error) {
      console.error("Error al guardar la ubicación:", error);
      Alert.alert(
        "Error",
        "No se pudo guardar la ubicación. Intenta de nuevo."
      );
    }
  };

  render() {
    const { location, markerPosition, searchQuery } = this.state;

    return (
      <View style={styles.container}>
        {/* Barra de búsqueda */}
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar ubicación"
            value={searchQuery}
            onChangeText={(text) => this.setState({ searchQuery: text })}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={this.onSearchLocation}
          >
            <MaterialIcons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.currentLocationButton}
          onPress={this.getCurrentLocation}
        >
          <Text style={styles.buttonText}>Usar ubicación actual</Text>
        </TouchableOpacity>

        {/* Mapa */}
        <MapView
          ref={(ref) => (this.map = ref)}
          style={styles.map}
          initialRegion={{
            latitude: location.latitude || 37.7749,
            longitude: location.longitude || -122.4194,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {markerPosition && (
            <Marker
              coordinate={markerPosition}
              draggable
              onDragEnd={(e) =>
                this.setState({ markerPosition: e.nativeEvent.coordinate })
              }
            />
          )}
        </MapView>

        {/* Sección de guardado */}
        <View style={styles.saveWrapper}>
          <Text style={styles.locationText}>
            Tu ubicación:{" "}
            {markerPosition
              ? `Latitud: ${markerPosition.latitude.toFixed(
                  5
                )}, Longitud: ${markerPosition.longitude.toFixed(5)}`
              : "Selecciona una ubicación"}
          </Text>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={this.onSaveLocation}
          >
            <Text style={styles.saveButtonText}>Guardar ubicación</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchWrapper: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderRadius: 4,
    borderColor: "#ccc",
    borderWidth: 1,
    marginRight: 5,
  },
  searchButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  currentLocationButton: {
    position: "absolute",
    top: 70,
    left: 10,
    right: 10,
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    zIndex: 1,
  },
  map: {
    flex: 1,
  },
  saveWrapper: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#28A745",
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  locationText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
});