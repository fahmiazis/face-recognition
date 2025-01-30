import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAnBRn2XVjVam4ayU48ovlWrRVLlEMnDjs",
    authDomain: "barcode-34218.firebaseapp.com",
    projectId: "barcode-34218",
    storageBucket: "barcode-34218.firebasestorage.app",
    messagingSenderId: "542127336873",
    appId: "1:542127336873:web:a3e9405305a28037f4e8b8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, onSnapshot };