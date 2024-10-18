import { db } from "@/config/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

export const saveSharedLink = async (data) => {
  try {
    const { hash, mode, ...rest } = data;
    const sharedLinksCollection = collection(db, 'shared_link');
  
    const querySnapshot = await getDocs(query(sharedLinksCollection, where("hash", "==", hash), where("mode", "==", mode)));
  
    if (querySnapshot.empty) {
      const newDocRef = await addDoc(sharedLinksCollection, {
        hash,
        mode,
        ...rest,
        createdAt: new Date().toISOString()
      });
      return newDocRef;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const getSharedLink = async (hash) => {
  try {
    const sharedLinksCollection = collection(db, 'shared_link');
    const querySnapshot = await getDocs(query(sharedLinksCollection, where("hash", "==", hash)));
    return querySnapshot.docs[0].data();
  } catch (error) {
    throw error;
  }
};
