import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyCB3DJar7xtVckepxQoCnx4rfhNf4DQ6f0",
    authDomain: "app-profgps.firebaseapp.com",
    databaseURL: "https://app-profgps-default-rtdb.firebaseio.com/",
    projectId: "app-profgps",
    storageBucket: "app-profgps.firebasestorage.app",
    messagingSenderId: "51908071871",
    appId: "1:51908071871:web:f8fc763df5e508e215910a"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;