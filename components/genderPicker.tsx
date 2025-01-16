import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface GenderPickerProps {
  selectedGender: string;
  onSelect: (gender: string) => void;
}

const GenderPicker: React.FC<GenderPickerProps> = ({ selectedGender, onSelect }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const options = ['Femenino', 'Masculino', 'Otro', 'Prefiero no Decir'];

  const handleSelect = (gender: string) => {
    onSelect(gender);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Campo seleccionable */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setDropdownVisible((prev) => !prev)}
      >
        <Text style={styles.selectedText}>
          {selectedGender || 'Seleccione género'}
        </Text>
        <Ionicons
          name={isDropdownVisible ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#666"
        />
      </TouchableOpacity>

      {/* Menú desplegable */}
      {isDropdownVisible && (
        <View style={styles.dropdown}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.option}
              onPress={() => handleSelect(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
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
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginTop: 4,
    zIndex: 10,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default GenderPicker;
