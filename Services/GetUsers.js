import { getFirestore, collection, getDocs } from "firebase/firestore";
import db from '../Connection/firebase';


export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "usuarios"));
  const users = [];
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });
  return users;
};