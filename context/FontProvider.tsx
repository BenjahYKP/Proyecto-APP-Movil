import React, { createContext, useContext, ReactNode } from 'react';
import { useFonts } from 'expo-font';
import { Text } from 'react-native';

const FontContext = createContext({ fontFamily: 'Poppins-Regular' });

interface FontProviderProps {
  children: ReactNode;
}

export const FontProvider = ({ children }: FontProviderProps) => {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  });


  return (
    <FontContext.Provider value={{ fontFamily: 'Poppins-Regular' }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => useContext(FontContext);
