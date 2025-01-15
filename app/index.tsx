// app/index.tsx
import React from 'react';
import { Text, View, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Index() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text> este es el index </Text>
      <Button title="Inicio" onPress={() => navigation.navigate('Dashboard')} />
    </View>
  );
}