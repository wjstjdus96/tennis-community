import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "./firebase";

interface IGetPost {
  collectionName: string;
  docId: string;
  setPostData: React.Dispatch<any>;
}

export function getPost({ collectionName, docId, setPostData }: IGetPost) {
  const docRef = doc(db, collectionName, docId);
  onSnapshot(docRef, (doc) => setPostData({ ...doc.data(), id: docId }));
}
