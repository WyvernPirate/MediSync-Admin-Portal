
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDRFSrbAFOQSDAqaY8kRK2JO8urT24eVHk",
  authDomain: "doctorappointmentapp-9f11a.firebaseapp.com",
  projectId: "doctorappointmentapp-9f11a",
  storageBucket: "doctorappointmentapp-9f11a.firebasestorage.app",
  messagingSenderId: "4258195571",
  appId: "1:4258195571:web:9f95e3008d6fa4b0ece206",
  measurementId: "G-TNRHQER43F"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
