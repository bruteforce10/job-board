// lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBn2T7pcB6fJ0psbxung-gb7HpseJy6gfg",
  authDomain: "mern-project-da186.firebaseapp.com",
  projectId: "mern-project-da186",
  storageBucket: "mern-project-da186.appspot.com",
  messagingSenderId: "243197533937",
  appId: "1:243197533937:web:8b3aa23ed2b43c3a271350",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
