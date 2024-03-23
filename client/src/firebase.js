import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "task1-16cd8.firebaseapp.com",
  projectId: "task1-16cd8",
  storageBucket: "task1-16cd8.appspot.com",
  messagingSenderId: "842261477865",
  appId: "1:842261477865:web:4a0c9469fe7316a7727378",
}

export const app = initializeApp(firebaseConfig)
