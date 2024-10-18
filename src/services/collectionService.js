import { db } from "@/config/firebase";
import { collection, query, where, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export const getAll = async (owner) => {
  try {
    const q = query(collection(db, "colletions"), where("owner", "==", owner));
    const collectionsRef = collection(db, "colletions");

    const querySnapshot = await getDocs(collectionsRef, q);
    const collections = [];
    querySnapshot.forEach((doc) => {
      collections.push({ id: doc.id, ...doc.data() });
    });
    return collections;
  } catch (error) {
    console.error("Error al obtener colecciones:", error);
    throw error;
  }
};

export const getAllByAnalysis = async (analysisId, owner) => {
  try {
    const q = query(
      collection(db, "colletions"),
      where("analysisId", "==", analysisId),
      where("owner", "==", owner)
    );
    const querySnapshot = await getDocs(q);
    const collections = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.analysisId === analysisId) {
        collections.push({ id: doc.id, ...data });
      }
    });
    return collections;
  } catch (error) {
    console.error("Error al obtener colecciones por análisis:", error);
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const docRef = doc(db, "colletions", id);
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
};

export const create = async (data) => {
  try {
    const { name, owner, analysisId, isDefault, ...restData } = data;
    const q = query(
      collection(db, "colletions"),
      where("name", "==", name),
      where("owner", "==", owner)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return {
        exists: true,
        data: querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      };
    }
    const newDocRef = await addDoc(collection(db, "colletions"), {
      owner: owner,
      name: name,
      analysisId: analysisId,
      isDefault: isDefault,
      data: restData,
      createdAt: new Date().toISOString()
    });
    return { exists: false, id: newDocRef.id, name: name, analysisId: analysisId, isDefault: isDefault, data: restData };
  } catch (error) {
    throw error;
  }
};

export const update = async (id, data) => {
  try {
    const docRef = doc(db, "colletions", id);
    await updateDoc(docRef, { data: data });
    return true;
  } catch (error) {
    console.error("Error al actualizar la colección:", error);
    throw error;
  }
};

export const deleteById = async (id) => {
  try {
    const q = query(collection(db, "colletions"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      await deleteDoc(doc.ref);
    }
  } catch (error) {
    throw error;
  }
};
