import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

interface IUpdateData {
  collectionName: string;
  docId: string;
  docField: string;
  incrementNum: number;
}

interface IUpdateDocData {
  collectionName: string;
  docId: string;
  newData: any;
}

export async function updateOneData({
  collectionName,
  docId,
  docField,
  incrementNum,
}: IUpdateData) {
  const docRef = doc(db, collectionName, docId);
  if (docField == "commentNum")
    await updateDoc(docRef, { commentNum: increment(incrementNum) });
  if (docField == "bookmarkNum")
    await updateDoc(docRef, { bookmarkNum: increment(incrementNum) });
}

export async function updateDocData({
  collectionName,
  docId,
  newData,
}: IUpdateDocData) {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, newData);
}
