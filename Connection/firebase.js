import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8TitizrfBkBr2AlK6zGyYEkTdr6FLOKE",
  authDomain: "prototipo-3836c.firebaseapp.com",
  projectId: "prototipo-3836c",
  storageBucket: "prototipo-3836c.appspot.com",
  messagingSenderId: "810891073102",
  appId: "1:810891073102:web:425f07a254489eee93d51f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;