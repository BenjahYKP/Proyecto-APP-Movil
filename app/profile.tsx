import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const router = useRouter();

  const MenuItem = ({
    icon,
    text,
    rightText = null,
    isLast = false,
    onPress,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    text: string;
    rightText?: string | null;
    isLast?: boolean;
    onPress?: () => void;
  }) => (
    <TouchableOpacity style={[styles.menuItem, !isLast && styles.menuItemBorder]} onPress={onPress}>
      <Ionicons name={icon} size={22} color="#4F46E5" style={styles.menuIcon} />
      <Text style={styles.menuText}>{text}</Text>
      {rightText && (
        <Text style={[styles.menuRightText, rightText.toLowerCase() === 'on' && styles.activeText]}>
          {rightText}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Ionicons name="notifications-outline" size={24} color="#4F46E5" />
        </View>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../assets/images/avatar.png')}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={16} color="#4F46E5" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>Penny Parker</Text>
          <Text style={styles.email}>p_parker1@gmail.com</Text>
        </View>

        <View style={styles.menuSection}>
          <MenuItem
            icon="person-outline"
            text="Editar perfil"
            onPress={() => router.push('/editProfile')}
          />
          <MenuItem icon="notifications-outline" text="Notificaciones" rightText="ON" />
          <MenuItem icon="language-outline" text="Idioma" rightText="Español" isLast />
        </View>

        <View style={styles.menuSection}>
          <MenuItem icon="shield-checkmark-outline" text="Seguridad" />
          <MenuItem icon="color-palette-outline" text="Tema" rightText="Modo Claro" />
          <MenuItem icon="card-outline" text="Gestionar Métodos de Pago" isLast />
        </View>

        <View style={styles.menuSection}>
          <MenuItem icon="help-circle-outline" text="Soporte" />
          <MenuItem icon="call-outline" text="Contacto" />
          <MenuItem icon="lock-closed-outline" text="Políticas de Privacidad" isLast />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 20,
    paddingBottom: 80,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 20,
    paddingTop: 10,
  },
  content: {
    flex: 1,
    marginTop: -60,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'white',
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  menuSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  menuRightText: {
    fontSize: 14,
    color: '#4F46E5',
  },
  activeText: {
    color: '#4F46E5',
    fontWeight: '600',
  },
});

export default ProfileScreen;

