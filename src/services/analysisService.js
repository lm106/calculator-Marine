import { db } from '@/config/firebase';
import { collection, query, where, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';

export const createAnalyses = async (owner, name) => {
  try {
    const q = query(
      collection(db, 'analyses'),
      where('owner', '==', owner),
      where('name', '==', name)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return { exists: true, data: querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) };
    }
    const newDocRef = await addDoc(collection(db, 'analyses'), {
      owner: owner,
      name: name,
      createdAt: new Date().toISOString()
    });
    return { id: newDocRef.id, name: name };
  } catch (error) {
    throw error;
  }
}

export const getAnalyses = async (owner) => {
  try {
    const q = query(collection(db, 'analyses'), where('owner', '==', owner));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
}

export const getAnalysisById = async (id) => {
  try {
    const docRef = doc(db, 'analyses', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("NOT FOUND");
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export const getAnalysesByHash = async (hash) => {
  try {
    const q = query(
      collection(db, 'analyses'),
      where('hash', '==', hash)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    return null;
  } catch (error) {
    throw error;
  }
}
