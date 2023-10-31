import { IGetComments } from "../interfaces/IFunction";
import { db } from "./firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function getComments({
  collectionName,
  docId,
  setComments,
}: IGetComments) {
  const q = query(
    collection(db, collectionName, docId, "comments"),
    orderBy("createdAt", "desc")
  );
  const querySnapShot = await getDocs(q);
  querySnapShot.forEach((doc) => {
    const docObj = {
      ...doc.data(),
      id: doc.id,
    };
    setComments((prev: any) => [...prev, docObj]);
  });
}
