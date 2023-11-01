import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

interface IDeletePost {
  collectionName: string;
  docId: string;
}

export const deletePost = async ({ collectionName, docId }: IDeletePost) => {
  await deleteDoc(doc(db, collectionName, docId));
};
