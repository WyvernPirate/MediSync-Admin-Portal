
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5M2YxJohj5REQaafzpyxQMF7FxQxOJq4",
  authDomain: "med-dash-demo.firebaseapp.com",
  projectId: "med-dash-demo",
  storageBucket: "med-dash-demo.appspot.com",
  messagingSenderId: "462442185818",
  appId: "1:462442185818:web:894a1c903861cf30215019",
  measurementId: "G-Z5KGZCMS7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Debug environment variables in development
if (import.meta.env.DEV) {
  console.log("Firebase initialized successfully with project:", firebaseConfig.projectId);
}

// Upload image to Firebase Storage
export const uploadImage = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image. Please try again.");
  }
};

export { 
  db, 
  auth,
  storage,
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  where,
  ref,
  uploadBytes,
  getDownloadURL
};
