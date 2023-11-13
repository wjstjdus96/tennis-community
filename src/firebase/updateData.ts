import {
  arrayRemove,
  arrayUnion,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";
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

interface IUpdateUserArrayData {
  userId: string;
  docField: string;
  changing: string;
  arrayItem: string;
}

export async function updateOneData({
  collectionName,
  docId,
  docField,
  incrementNum,
}: IUpdateData) {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, { [docField]: increment(incrementNum) });
}

export async function updateDocData({
  collectionName,
  docId,
  newData,
}: IUpdateDocData) {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, newData);
}

export function updateUserArrayData({
  userId,
  docField,
  changing,
  arrayItem,
}: IUpdateUserArrayData) {
  if (changing == "add")
    updateDoc(doc(db, "users", userId), {
      [docField]: arrayUnion(arrayItem),
    });
  if (changing == "remove")
    updateDoc(doc(db, "users", userId), {
      [docField]: arrayRemove(arrayItem),
    });
}