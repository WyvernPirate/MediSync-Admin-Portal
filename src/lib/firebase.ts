
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
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

// Mock data for development environment
const mockDoctors = [
  {
    id: "doc1",
    name: "Dr. Jane Smith",
    specialty: "Cardiology",
    email: "jane.smith@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, San Francisco, CA",
    status: "active",
    rating: 4.8,
    imageUrl: "",
    bio: "Board certified cardiologist with over 15 years of experience.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "doc2",
    name: "Dr. John Davis",
    specialty: "Neurology",
    email: "john.davis@example.com",
    phone: "(555) 987-6543",
    address: "456 Oak Ave, San Francisco, CA",
    status: "active",
    rating: 4.5,
    imageUrl: "",
    bio: "Specializes in neurological disorders with a focus on migraines.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "doc3",
    name: "Dr. Sarah Williams",
    specialty: "Dermatology",
    email: "sarah.williams@example.com",
    phone: "(555) 456-7890",
    address: "789 Pine St, San Francisco, CA",
    status: "on-leave",
    rating: 4.9,
    imageUrl: "",
    bio: "Expert in cosmetic and medical dermatology treatments.",
    createdAt: new Date().toISOString(),
  }
];

const mockAdmins = [
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@meddash.com",
    passwordHash: "$2a$10$KPVVz4LHzXgUIFE5IgfX9O4pYQUYx6GZTMmx2CBe2bR.RXNr0vF9i", // password is 'password123'
  }
];

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
  
  // Provide mock implementation for development/testing
  if (import.meta.env.DEV) {
    console.warn('Using mock Firebase in development due to configuration error.');
    
    // Mock Firestore functionality
    db = {
      // Mock collection function
      collection: (collectionPath) => {
        return {
          path: collectionPath,
        };
      },
    };
    
    // Override Firestore functions with mock implementations
    const mockFirestore = {
      collection: (_, collectionPath) => {
        return {
          path: collectionPath,
        };
      },
      
      getDocs: async (querySnapshot) => {
        const collectionPath = querySnapshot.path || querySnapshot._queryOptions?.path;
        
        let mockData = [];
        if (collectionPath === 'doctors') {
          mockData = mockDoctors;
        } else if (collectionPath === 'admins') {
          mockData = mockAdmins;
        }
        
        return {
          docs: mockData.map(item => ({
            id: item.id,
            data: () => ({ ...item }),
          })),
        };
      },
      
      addDoc: async (_, data) => {
        const newId = `mock-${Date.now()}`;
        return { id: newId };
      },
      
      updateDoc: async () => Promise.resolve(),
      
      deleteDoc: async () => Promise.resolve(),
      
      doc: (_, docPath) => ({ id: docPath }),
      
      query: (collectionRef, ...queryConditions) => {
        return {
          ...collectionRef,
          _queryOptions: { conditions: queryConditions, path: collectionRef.path }
        };
      },
      
      where: (field, op, value) => ({ field, op, value }),
    };
    
    // Replace global functions with mock implementations
    global.collection = mockFirestore.collection;
    global.getDocs = mockFirestore.getDocs;
    global.addDoc = mockFirestore.addDoc;
    global.updateDoc = mockFirestore.updateDoc;
    global.deleteDoc = mockFirestore.deleteDoc;
    global.doc = mockFirestore.doc;
    global.query = mockFirestore.query;
    global.where = mockFirestore.where;
    
    // Mock auth
    auth = {
      signInWithEmailAndPassword: async () => ({ user: { uid: 'mock-user-id' } }),
    };
    
    app = { name: '[DEFAULT]' };
  } else {
    // In production, we want to know about this error
    throw error;
  }
}

export const firebase = app;
export { 
  db, 
  auth,
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  where
};
