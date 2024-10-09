import { db } from '@/config/firebase';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
export const getAll = async (collectionName, userId) => {
    try {
      const q = query(
        collection(db, collectionName),
        where('userId', '==', userId)
      );
      const collectionsRef = collection(db, collectionName);

      const querySnapshot = await getDocs(collectionsRef, q);
      const collections = [];
      querySnapshot.forEach((doc) => {
          collections.push({ id: doc.id, ...doc.data() });
      });
      return collections;
    } catch (error) {
      console.error('Error al obtener colecciones:', error);
      throw error;
    }
  };
export const getOne = async (collectionName, nameOfCollection, userId) => {
  try {
    const q = query(
      collection(db, collectionName),
      where('name', '==', nameOfCollection),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error al buscar colecciones:', error);
    throw error;
  }
};

// TODO: rename to CreateCollections
export const getOrCreate = async (documentName, collectionName, userId, data) => {
  try {
    const q = query(
      collection(db, documentName),
      where('name', '==', collectionName),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return { exists: true, data: querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) };
    }
    const newDocRef = await addDoc(collection(db, documentName), {
      userId: userId,
      name: collectionName,
      data: data
    });
    return { exists: false, ...newDocRef };
  } catch (error) {
    throw error;
  }
};

export const saveSharedLink = async (collectionName, userId, data) => {
  const newDocRef = await addDoc(collection(db, collectionName), {
    userId: userId,
    ...data
  });
  return newDocRef;
};

export const getAndUpdate = async (documentName, collectionName, userId, data) => {
  try {
    const q = query(
      collection(db, documentName),
      where('name', '==', collectionName),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      await updateDoc(doc.ref, { data });
    }
    return false;
  } catch (error) {
    console.error('Error al actualizar el documento:', error);
    throw error;
  }
}
export const getAndDelete = async (documentName, collectionName, userId) => {
  try {
    const q = query(
      collection(db, documentName),
      where('name', '==', collectionName),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      await deleteDoc(doc.ref);
    }
  } catch (error) {
    console.error('Error al borrar la colección:', error);
    throw error;
  }
};