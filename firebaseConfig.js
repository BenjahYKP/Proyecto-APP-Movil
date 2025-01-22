import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage"; 
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCB3DJar7xtVckepxQoCnx4rfhNf4DQ6f0",
  authDomain: "app-profgps.firebaseapp.com",
  databaseURL: "https://app-profgps-default-rtdb.firebaseio.com",
  projectId: "app-profgps",
  storageBucket: "app-profgps.firebasestorage.app",
  messagingSenderId: "51908071871",
  appId: "1:51908071871:web:f8fc763df5e508e215910a"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const firestore = getFirestore(app);

const storage = getStorage(app); 

export { auth, firestore, storage };

