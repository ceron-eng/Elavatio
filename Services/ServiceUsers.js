import bcrypt from 'react-native-bcrypt';
import isaac from "isaac";
import db from '../Connection/firebase';
import {
  addDoc, updateDoc, collection,
  query, where, getDocs, doc,
  deleteDoc, getDoc
} from "firebase/firestore";


bcrypt.setRandomFallback((len) => {
  const buf = new Uint8Array(len);

  return buf.map(() => Math.floor(isaac.random() * 256));
});

export const registerUser = async (name, lastName, lastName2, username, password, rol, userName) => {

  try {

    if (userExist(username) >= 1) {
      return { success: false, message: "El usuario ya existe" };
    }

    const saltRounds = 5;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const docuRef = collection(db, "usuarios");
    await addDoc(docuRef, {
      Name: name, LastName: lastName, LastName2: lastName2,
      Username: username, Password: hashedPassword, Rol: rol, creatorUser: userName
    });
    return { success: true };
  } catch (error) {
    throw new Error("Error al registrar el usuario");
  }
};

export const updateUser = async (userData) => {
  try {
    console.log(userData);
    const userDoc = doc(db, "usuarios", userData.id);

    const userSnapshot = await getDoc(userDoc);

    if (!userSnapshot.exists()) {
      return { success: false, message: "El usuario no existe" };
    }

    var size = await userExist(userData.Username);
    if (size >= 2) {
      return { success: false, message: "El usuario ya existe" };
    }

    const saltRounds = 5;
    const hashedPassword = bcrypt.hashSync(userData.Password, saltRounds);

    await updateDoc(userDoc, {
      Name: userData.Name,
      LastName: userData.LastName,
      LastName2: userData.LastName2,
      Username: userData.Username,
      Password: hashedPassword,
      Rol: userData.Rol,
      creatorUser : userData.creatorUser,
      userWhoEdited: userData.userWhoEdited,
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("Error al actualizar el usuario" + error);
  }
}

export const deleteUser = async (id, username) => {
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

export const loginUser = async (username, password) => {
  try {
    // Buscar el usuario en la base de datos
    const usersRef = collection(db, "usuarios");
    const q = query(usersRef, where("Username", "==", username));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: "Usuario no encontrado" };
    }

    // Verificar la contraseña
    const userDoc = querySnapshot.docs[0].data();
    const hashedPassword = userDoc.Password;
    const passwordMatch = bcrypt.compareSync(password, hashedPassword);

    if (!passwordMatch) {
      return { success: false, message: "Contraseña incorrecta" };
    }
    // Si la contraseña coincide, devolver éxito y los datos del usuario
    return { success: true, userRole: userDoc.Rol, userName: userDoc.Username };
  } catch (error) {
    throw new Error("Error al iniciar sesión");
  }
};

export const userExist = async (username) => {
  const userRef = collection(db, "usuarios");
  const q = query(userRef, where("Username", "==", username));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length;
}