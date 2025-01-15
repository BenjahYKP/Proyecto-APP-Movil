import { Stack } from 'expo-router';


const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false, 
      }}
    />
  );
};

export default RootLayout;

