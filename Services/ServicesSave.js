import { collection, addDoc } from "firebase/firestore";
import db from '../Connection/firebase';

export const saveTD = async (data) => {
  try {
    const userRef = collection(db, "Registros-TD");
    await addDoc(userRef, data);
    return true;
  } catch (error) {
    return false;
  }
};

export const saveCCM = async (data) => {
  try {
    const userRef = collection(db, "Registros-CMM");
    await addDoc(userRef, data);
    return true;
  } catch (error) {
    return false;
  }
};

export const saveTGD = async (data) => {
  try {
    const userRef = collection(db, "Registros-TGD");
    await addDoc(userRef, data);
    return true;
  } catch (error) {
    return false;
  }
};