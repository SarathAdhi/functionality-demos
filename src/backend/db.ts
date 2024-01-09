import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_FIREBASE_API_KEY,
  authDomain: "for-content-testing.firebaseapp.com",
  projectId: "for-content-testing",
  storageBucket: "for-content-testing.appspot.com",
  messagingSenderId: "198872787630",
  appId: process.env.NEXT_FIREBASE_APP_ID,
  measurementId: "G-2E5RTQ2E6P",
};

const app = initializeApp(firebaseConfig);

export const dbFireStore = getFirestore(app);
export const storage = getStorage(app);

export const formCollectionRef = collection(dbFireStore, "forms");
export const formDataCollectionRef = collection(dbFireStore, "form-data");
