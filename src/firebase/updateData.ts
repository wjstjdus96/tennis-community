import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

interface IUpdateData {
  collectionName: string;
  docId: string;
}

export async function updateData({ collectionName, docId }: IUpdateData) {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, { commentNum: increment(1) });
}
