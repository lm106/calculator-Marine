import { db } from '@/config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const getAll = async (documentName, userId) => {
    try {
      const collectionsRef = collection(db, documentName);
      const querySnapshot = await getDocs(collectionsRef);
  
      const collections = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().userId === userId) {
          collections.push({ id: doc.id, ...doc.data() }); 
        }
      });
  
      return collections;
    } catch (error) {
      console.error('Error al obtener colecciones:', error);
      throw error;
    }
  };

export const getOne = async (documentName, collectionName, userId) => {
  try {
    const q = query(
      collection(db, documentName),
      where('collectionName', '==', collectionName),
      where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(q);
    const results = [];

    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });

    return results;
  } catch (error) {
    console.error('Error al buscar colecciones:', error);
    throw error;
  }
};

export const getOrCreate = async (documentName, collectionName, userId) => {
  try {
    const q = query(
      collection(db, documentName),
      where('collectionName', '==', collectionName),
      where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return { exists: true, data: querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) };
    }

    const newDocRef = await addDoc(collection(db, documentName), {
      userId: userId,
      collectionName: collectionName,
      data: {}
    });

    return { exists: false, ...newDocRef };
  } catch (error) {
    throw error;
  }
};
