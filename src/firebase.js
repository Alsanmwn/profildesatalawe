import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDbCadBhVkVoloOhUKsNFQCkueXnz4-GpY",
  authDomain: "kknt-114-desatalawe.firebaseapp.com",
  projectId: "kknt-114-desatalawe",
  storageBucket: "kknt-114-desatalawe.firebasestorage.app",
  messagingSenderId: "495642501138",
  appId: "1:495642501138:web:c7e48bf9aac708e15938cb",
  measurementId: "G-BTJ6ZPWD33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;