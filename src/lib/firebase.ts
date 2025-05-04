
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Debug environment variables in development
if (import.meta.env.DEV) {
  console.log("Firebase config:", {
    apiKeyExists: !!import.meta.env.VITE_FIREBASE_API_KEY,
    authDomainExists: !!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectIdExists: !!import.meta.env.VITE_FIREBASE_PROJECT_ID,
    // Don't log the actual values for security reasons, just whether they exist
  });
}

// Initialize Firebase with error handling
let app;
let db;
let auth;

try {
  // Check that required config is present
  if (!import.meta.env.VITE_FIREBASE_API_KEY) {
    throw new Error('Firebase API key is missing. Make sure VITE_FIREBASE_API_KEY is set in your .env file.');
  }
  
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
} catch (error) {
  console.error('Error initializing Firebase:', error);
  
  // Provide fallback for development/testing
  if (import.meta.env.DEV) {
    console.warn('Using mock Firebase in development due to configuration error.');
    // This allows the app to at least render in development
    app = {} as any;
    db = {} as any; 
    auth = {} as any;
  } else {
    // In production, we want to know about this error
    throw error;
  }
}

export const firebase = app;
export { db, auth };
