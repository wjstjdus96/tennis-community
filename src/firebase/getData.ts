import { getDownloadURL, getStorage, ref } from "firebase/storage";
import defaultProfile from "../assets/defaultProfile.png";
import { IGetImage, IGetUserBookmark } from "../interfaces/IFunction";
import {
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import {
  IGetPost,
  IGetPosts,
  IGetPostsByPage,
  IGetComments,
} from "../interfaces/IFunction";
import { getAuth } from "firebase/auth";
import { IUserBookmarkState } from "../recoil/atom";

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

export const getImage = ({ imageURL }: IGetImage) => {
  const storage = getStorage();
  return imageURL != ""
    ? getDownloadURL(ref(storage, `${imageURL}`))
    : defaultProfile;
};

export function getOnePost({ collectionName, docId, setPostData }: IGetPost) {
  const docRef = doc(db, collectionName, docId);
  onSnapshot(docRef, (doc) => setPostData({ ...doc.data(), id: docId }));
}

export const getPosts = async ({
  collectionName,
  keyword,
  filterType,
  setPosts,
}: IGetPosts) => {
  const collectionRef = collection(db, collectionName);
  const querySnapShot = await getDocs(
    keyword
      ? query(
          collectionRef,
          where("titleKeyword", "array-contains", keyword),
          orderBy(filterType[1], "desc")
        )
      : query(collectionRef, orderBy(filterType[1], "desc"))
  );

  querySnapShot.forEach((doc) => {
    const postObject = {
      ...doc.data(),
      id: doc.id,
    };
    setPosts((prev: any) => [...prev, postObject]);
  });
};

export const getPostsByPage = async ({
  offset,
  collectionName,
  keyword,
  filterType,
  postsPerPage,
  setPosts,
}: IGetPostsByPage) => {
  const collectionRef = collection(db, collectionName);
  if (offset == 0) {
    const querySnapShot = await getDocs(
      keyword
        ? query(
            collectionRef,
            where("titleKeyword", "array-contains", keyword),
            orderBy(filterType[1], "desc"),
            limit(postsPerPage)
          )
        : query(
            collectionRef,
            orderBy(filterType[1], "desc"),
            limit(postsPerPage)
          )
    );
    querySnapShot.forEach((doc) => {
      const postObject = {
        ...doc.data(),
        id: doc.id,
      };
      setPosts((prev: any) => [...prev, postObject]);
    });
  } else {
    const prev = keyword
      ? query(
          collectionRef,
          where("titleKeyword", "array-contains", keyword),
          orderBy(filterType[1], "desc"),
          limit(offset)
        )
      : query(collectionRef, orderBy(filterType[1], "desc"), limit(offset));
    const documentSnapshots = await getDocs(prev);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    const next = keyword
      ? query(
          collectionRef,
          where("titleKeyword", "array-contains", keyword),
          orderBy(filterType[1], "desc"),
          startAfter(lastVisible),
          limit(postsPerPage)
        )
      : query(
          collectionRef,
          orderBy(filterType[1], "desc"),
          startAfter(lastVisible),
          limit(postsPerPage)
        );

    (await getDocs(next)).forEach((doc: any) => {
      const postObject = {
        ...doc.data(),
        id: doc.id,
      };
      setPosts((prev: any) => [...prev, postObject]);
    });
  }
};

export const getUserBookmark = ({ userId, setUserState }: IGetUserBookmark) => {
  const docRef = doc(db, "users", userId);
  onSnapshot(docRef, (doc) => {
    const data = doc.data();
    var communityBookmark = data ? data.communityBookmark : [];
    var recruitBookmark = data ? data.recruitBookmark : [];
    var marketBookmark = data ? data.marketBookmark : [];
    setUserState({
      community: communityBookmark,
      recruit: recruitBookmark,
      market: marketBookmark,
    });
  });
};
