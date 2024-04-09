import bcrypt from 'react-native-bcrypt';
import isaac from "isaac";
import db from '../Connection/firebase';
import { addDoc, updateDoc, collection,
        query, where, getDocs, doc, 
        deleteDoc , getDoc } from "firebase/firestore";


bcrypt.setRandomFallback((len) => {
	const buf = new Uint8Array(len);

	return buf.map(() => Math.floor(isaac.random() * 256));
});

export const registerUser = async (name, lastName,lastName2,username, password, rol) => {
    
        try {
           
            if (userExist(username)>=1) {
                return { success: false, message: "El usuario ya existe" };
            }
           
            const saltRounds = 5;
            const hashedPassword = bcrypt.hashSync(password, saltRounds);
            const docuRef = collection(db, "usuarios");
           await addDoc(docuRef, {
                Name: name, LastName: lastName, LastName2: lastName2,
                Username: username, Password: hashedPassword, Rol: rol
            });
            return { success: true };
        } catch (error) {
            throw new Error("Error al registrar el usuario");
        }
};


export const updateUser = async (userId, name, lastName, lastName2, username, password, rol) => {
    try {
      const userDoc = doc(db, "usuarios", userId);
      
      const userSnapshot = await getDoc(userDoc);
     
      if (!userSnapshot.exists()) {
        return { success: false, message: "El usuario no existe" };
      }
  
      var size = await userExist(username);
      if (size >= 2) {
        return { success: false, message: "El usuario ya existe" };
      }

      const saltRounds = 5;
      const hashedPassword = bcrypt.hashSync(password, saltRounds);
  
      await updateDoc(userDoc, {
        Name: name,
        LastName: lastName,
        LastName2: lastName2,
        Username: username,
        Password: hashedPassword,
        Rol: rol,
      });
  
      return { success: true };
    } catch (error) {
      console.log(error);
      throw new Error("Error al actualizar el usuario" + error);
    }
  }

export const deleteUser = async(id,username)=>{
  try {
    const userDoc = doc(db, "usuarios", id);

    
    var size = await userExist(username);
    if (size == 0) {
      return false;
    }
    await deleteDoc(userDoc);
    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Error al eliminar el usuario" + error);
  }
}

  export const userExist = async (username) => {
    const userRef = collection(db, "usuarios");
    const q = query(userRef, where("Username", "==", username));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.length;
  }