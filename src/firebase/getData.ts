import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import defaultProfile from "../assets/defaultProfile.png";
import {
  IGetComments,
  IGetImage,
  IGetOnePost,
  IGetPost,
  IGetTotalPosts,
  IGetUserActivities,
  IGetUserBookmark,
  IGetWriterInfo,
} from "../interfaces/IFunction";
import { deduplicateWriting } from "../utils/deduplicateWriting";
import { IGetTotalPostsByPage, IMakingQuery } from "./../interfaces/IFunction";
import { db } from "./firebase";

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

export function getOnePost({
  collectionName,
  docId,
  setPostData,
}: IGetOnePost) {
  const docRef = doc(db, collectionName, docId);
  onSnapshot(docRef, (doc) => setPostData({ ...doc.data(), id: docId }));
}

const makingQuery = ({
  collectionName,
  recruitType,
  marketCategory,
  keyword,
  filterType,
}: IMakingQuery) => {
  const collectionRef = collection(db, collectionName);
  let queryRef = query(collectionRef);

  if (recruitType && recruitType[1] != null) {
    queryRef = query(queryRef, where("type", "==", recruitType[0]));
  }
  if (marketCategory && marketCategory[1] != null) {
    queryRef = query(queryRef, where("category", "==", marketCategory[0]));
  }
  if (keyword) {
    queryRef = query(
      queryRef,
      where("titleKeyword", "array-contains", keyword)
    );
  }
  queryRef = query(queryRef, orderBy(filterType[1], "desc"));

  return queryRef;
};

export const getTotalPosts = async ({
  collectionName,
  keyword,
  filterType,
  recruitType,
  marketCategory,
  setPosts,
}: IGetTotalPosts) => {
  const queryRef = makingQuery({
    collectionName,
    recruitType,
    marketCategory,
    keyword,
    filterType,
  });
  const querySnapShot = await getDocs(queryRef);

  querySnapShot.forEach((doc) => {
    const postObject = {
      ...doc.data(),
      id: doc.id,
    };
    setPosts((prev: any) => [...prev, postObject]);
  });
};

export const getTotalPostsByPage = async ({
  offset,
  collectionName,
  keyword,
  filterType,
  recruitType,
  marketCategory,
  postsPerPage,
  setPosts,
}: IGetTotalPostsByPage) => {
  const queryRef = makingQuery({
    collectionName,
    keyword,
    filterType,
    recruitType,
    marketCategory,
  });
  let initial = queryRef;
  let next = queryRef;
  if (offset == 0) {
    initial = query(queryRef, limit(postsPerPage));
  } else {
    const prev = query(queryRef, limit(offset));
    const documentSnapshots = await getDocs(prev);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    next = query(queryRef, startAfter(lastVisible), limit(postsPerPage));
  }
  const querySnapShot = await getDocs(offset == 0 ? initial : next);
  querySnapShot.forEach((doc) => {
    const postObject = {
      ...doc.data(),
      id: doc.id,
    };
    setPosts((prev: any) => [...prev, postObject]);
  });
};

export const getUserBookmark = ({ userId, setUserState }: IGetUserBookmark) => {
  const docRef = doc(db, "users", userId);
  onSnapshot(docRef, (doc) => {
    const data = doc.data();
    if (data) {
      setUserState({
        community: data.communityBookmark,
        recruit: data.recruitBookmark,
        market: data.marketBookmark,
      });
    }
  });
};

export const getWriterInfo = ({ userId, setWriterInfo }: IGetWriterInfo) => {
  const docRef = doc(db, "users", userId);
  onSnapshot(docRef, (doc) => {
    const data = doc.data();
    setWriterInfo({
      id: userId,
      name: data ? data.displayName : "",
      profileImg: data ? data.displayPhoto : defaultProfile,
    });
  });
};

export const getUserActivities = async ({
  userId,
  field,
  setFieldItems,
}: IGetUserActivities) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  if (data) {
    if (field == "comment") {
      const commentFieldData = {
        community: data.communityComment
          ? deduplicateWriting(data.communityComment.reverse())
          : [],
        recruit: data.recruitComment
          ? deduplicateWriting(data.recruitComment.reverse())
          : [],
        market: data.marketComment
          ? deduplicateWriting(data.marketComment.reverse())
          : [],
      };
      setFieldItems(commentFieldData);
    }
    if (field == "writing") {
      const writingFieldData = {
        community: data.communityWriting ? data.communityWriting.reverse() : [],
        recruit: data.recruitWriting ? data.recruitWriting.reverse() : [],
        market: data.marketWriting ? data.marketWriting.reverse() : [],
      };
      setFieldItems(writingFieldData);
    }
    if (field == "bookmark") {
      if (data) {
        const bookmarkFieldData = {
          community: data.communityBookmark.reverse(),
          recruit: data.recruitBookmark.reverse(),
          market: data.marketBookmark.reverse(),
        };
        setFieldItems(bookmarkFieldData);
      }
    }
  }
};

export async function getPost({ collectionName, docId }: IGetPost) {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  return docSnap.data() ?? {};
}
