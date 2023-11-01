import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import { updateOneData } from "./updateData";

interface IDeletePost {
  collectionName: string;
  docId: string;
}

interface IDeleteComment {
  collectionName: string;
  docId: string;
  commentId: string;
}

export const deletePost = async ({ collectionName, docId }: IDeletePost) => {
  await deleteDoc(doc(db, collectionName, docId));
};

export const deleteComment = async ({
  collectionName,
  docId,
  commentId,
}: IDeleteComment) => {
  const commentRef = doc(db, collectionName, docId, "comments", commentId);
  await deleteDoc(commentRef);

  updateOneData({
    collectionName: collectionName,
    docId: docId,
    docField: "commentNum",
    incrementNum: -1,
  });
};
