import { db } from "@/config/firebase";
import { collection, addDoc } from "firebase/firestore";

export const saveSharedLink = async (data) => {
  const { owner, ...rest } = data;
  const newDocRef = await addDoc(collection(db, 'shared_link'), {
    owner,
    ...rest,
    createdAt: new Date().toISOString()
  });
  return newDocRef;
};
