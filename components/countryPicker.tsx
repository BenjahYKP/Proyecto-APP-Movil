import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


// Aqui tambien debo modificar cosas
const countries = [
  'Afghanistan', 'Argentina', 'Australia', 'Brazil', 'Canada', 'Chile', 'China',
  'France', 'Germany', 'India', 'Italy', 'Japan', 'Mexico', 'Spain', 'United States',
];

interface CountryPickerProps {
  selectedCountry: string;
  onSelect: (country: string) => void;
}

const CountryPicker: React.FC<CountryPickerProps> = ({ selectedCountry, onSelect }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleSelect = (country: string) => {
    onSelect(country);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setDropdownVisible((prev) => !prev)}
      >
        <Text style={styles.selectedText}>
          {selectedCountry || 'Seleccione un país'}
        </Text>
        <Ionicons
          name={isDropdownVisible ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#666"
        />
      </TouchableOpacity>
      {isDropdownVisible && (
        <View style={styles.dropdown}>
          <FlatList
            data={countries}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    maxHeight: 200,
    overflow: 'hidden',
    zIndex: 1,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default CountryPicker;
