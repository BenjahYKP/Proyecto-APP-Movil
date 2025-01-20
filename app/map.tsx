import React, { Component } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { getRegion } from "./helpers/map";
import * as Location from "expo-location";
import firebase from "../config/firebase";
import {
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
  Keyboard,
  StyleSheet,
  View,
  Text,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Componente separado para el contenido del Callout
const CalloutContent = React.memo(({ text }: { text: string }) => (
  <View style={{ backgroundColor: "white", padding: 10 }}>
    <Text>{text || "Sin mensaje"}</Text>
  </View>
));

export default class Map extends Component {
  state: {
    location: {
      latitude: number | null;
      longitude: number | null;
    };
    messageText: string;
    sendButtonActive: boolean;
    messages: {
      key: string;
      text: string;
      latitude: number;
      longitude: number;
      timestamp: number;
    }[];
  } = {
    location: {
      latitude: null,
      longitude: null,
    },
    messageText: "",
    sendButtonActive: false,
    messages: [], // Almacena los mensajes enviados con su ubicación
  };

  private map: MapView | null = null;

  componentDidMount() {
    this.getLocation();
    this.listenToMessages(); // Escucha los mensajes en Firebase
  }

  getLocation = async () => {
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
      this.setState({
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });

      this.map?.animateToRegion(
        getRegion(location.coords.latitude, location.coords.longitude, 16000)
      );
    } catch (error) {
      console.error("Error al obtener la ubicación:", error);
      Alert.alert(
        "Error",
        "No se pudo obtener la ubicación. Estableciendo ubicación predeterminada."
      );
      // Fallback: Ubicación predeterminada
      this.setState({
        location: {
          latitude: 48.860831,
          longitude: 2.341129, // Ejemplo: París
        },
      });
    }
  };

  listenToMessages = () => {
    firebase
      .database()
      .ref("messages")
      .on("value", (snapshot) => {
        const messages: {
          key: string;
          text: string;
          latitude: number;
          longitude: number;
          timestamp: number;
        }[] = [];
        snapshot.forEach((child) => {
          const messageData = child.val();
          if (messageData.text && messageData.text.trim() !== "") {
            messages.push({
              key: child.key,
              ...messageData,
            });
          }
        });
        console.log("Mensajes obtenidos:", messages);

        // Asegurarse de crear una nueva referencia de arreglo
        this.setState({ messages: [...messages] });
        console.log("Estado de mensajes actualizado:", this.state.messages);
      });
  };

  onChangeText(messageText: string) {
    this.setState({
      messageText: messageText,
      sendButtonActive: messageText.length > 0,
    });
  }

  onSendPress() {
    const { location, messageText } = this.state;
    if (!location.latitude || !location.longitude) {
      Alert.alert(
        "Error",
        "No se puede enviar el mensaje sin una ubicación válida."
      );
      return;
    }

    if (this.state.sendButtonActive) {
      firebase
        .database()
        .ref("messages")
        .push({
          text: messageText,
          latitude: location.latitude,
          longitude: location.longitude,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
        })
        .then(() => {
          this.setState({ messageText: "" }); // Limpia el campo del mensaje
          ToastAndroid.show("Your message has been sent!", ToastAndroid.SHORT);
          Keyboard.dismiss();
        })
        .catch((error: unknown) => {
          console.error(error);
        });
    }
  }

  render() {
    const { location, messages } = this.state;
    console.log("Renderizando mensajes:", this.state.messages);

    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Type your message here"
            onChangeText={(messageText) => this.onChangeText(messageText)}
            value={this.state.messageText}
          />
          <View
            style={{
              ...styles.sendButton,
              ...(this.state.sendButtonActive ? styles.sendButtonActive : {}),
            }}
          >
            <TouchableOpacity onPress={this.onSendPress.bind(this)}>
              <MaterialIcons name="send" size={32} color="#fe4027" />
            </TouchableOpacity>
          </View>
        </View>
        <MapView
          ref={(ref) => (this.map = ref)}
          style={styles.map}
          initialRegion={getRegion(48.860831, 2.341129, 160000)}
        >
          {messages.map((message) => (
            <Marker
              key={`${message.key}-${message.timestamp}-${message.text}`}
              coordinate={{
                latitude: message.latitude,
                longitude: message.longitude,
              }}
            >
              <Callout>
                <CalloutContent text={message.text} />
              </Callout>
            </Marker>
          ))}

          {location.latitude && location.longitude && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              pinColor="blue"
            >
              <Callout>
                <CalloutContent text="¡Ubicación actual cargada!" />
              </Callout>
            </Marker>
          )}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  inputWrapper: {
    width: "100%",
    position: "absolute",
    padding: 10,
    top: StatusBar.currentHeight,
    left: 0,
    zIndex: 100,
  },
  input: {
    height: 46,
    paddingVertical: 10,
    paddingRight: 50,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  sendButton: {
    position: "absolute",
    top: 17,
    right: 20,
    opacity: 0.4,
  },
  sendButtonActive: {
    opacity: 1,
  },
});
