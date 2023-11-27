import { getDownloadURL, getStorage, ref } from "firebase/storage";
import defaultProfile from "../assets/defaultProfile.png";
import {
  IGetImage,
  IGetOnePost,
  IGetPost,
  IGetRecruitPosts,
  IGetRecruitPostsByPage,
  IGetUserActivities,
  IGetUserBookmark,
  IGetWriterInfo,
} from "../interfaces/IFunction";
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
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import {
  IGetPosts,
  IGetPostsByPage,
  IGetComments,
} from "../interfaces/IFunction";
import { getAuth } from "firebase/auth";
import { IUserBookmarkState } from "../recoil/atom";
import { IPost, IWriterInfo } from "../interfaces/IValue";
import { deduplicateWriting } from "../utils/deduplicateWriting";

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

export const getRecruitPosts = async ({
  collectionName,
  keyword,
  filterType,
  recruitType,
  setPosts,
}: IGetRecruitPosts) => {
  if (recruitType[1] == null) {
    getPosts({
      collectionName: collectionName,
      keyword: keyword,
      filterType: filterType,
      setPosts: setPosts,
    });
  } else {
    const collectionRef = collection(db, collectionName);
    const querySnapShot = await getDocs(
      keyword
        ? query(
            collectionRef,
            where("type", "==", recruitType![0]),
            where("titleKeyword", "array-contains", keyword),
            orderBy(filterType[1], "desc")
          )
        : query(
            collectionRef,
            filterType && where("type", "==", recruitType![0]),
            orderBy(filterType[1], "desc")
          )
    );
    querySnapShot.forEach((doc) => {
      const postObject = {
        ...doc.data(),
        id: doc.id,
      };
      setPosts((prev: any) => [...prev, postObject]);
    });
  }
};

export const getRecruitPostsByPage = async ({
  offset,
  collectionName,
  keyword,
  filterType,
  recruitType,
  postsPerPage,
  setPosts,
}: IGetRecruitPostsByPage) => {
  if (recruitType[1] == null) {
    getPostsByPage({
      offset: offset,
      collectionName: collectionName,
      keyword: keyword,
      filterType: filterType,
      postsPerPage: postsPerPage,
      setPosts: setPosts,
    });
  } else {
    const collectionRef = collection(db, collectionName);
    if (offset == 0) {
      const querySnapShot = await getDocs(
        keyword
          ? query(
              collectionRef,
              filterType && where("type", "==", recruitType![0]),
              where("titleKeyword", "array-contains", keyword),
              orderBy(filterType[1], "desc"),
              limit(postsPerPage)
            )
          : query(
              collectionRef,
              where("type", "==", recruitType![0]),
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
            where("type", "==", recruitType![0]),
            where("titleKeyword", "array-contains", keyword),
            orderBy(filterType[1], "desc"),
            limit(offset)
          )
        : query(
            collectionRef,
            where("type", "==", recruitType![0]),
            orderBy(filterType[1], "desc"),
            limit(offset)
          );
      const documentSnapshots = await getDocs(prev);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      const next = keyword
        ? query(
            collectionRef,
            where("type", "==", recruitType![0]),
            where("titleKeyword", "array-contains", keyword),
            orderBy(filterType[1], "desc"),
            startAfter(lastVisible),
            limit(postsPerPage)
          )
        : query(
            collectionRef,
            where("type", "==", recruitType![0]),
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
  }
};

export const getUserBookmark = ({ userId, setUserState }: IGetUserBookmark) => {
  const docRef = doc(db, "users", userId);
  onSnapshot(docRef, (doc) => {
    const data = doc.data();
    setUserState({
      community: data ? data.communityBookmark : [],
      recruit: data ? data.recruitBookmark : [],
      market: data ? data.marketBookmark : [],
    });
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
        recruit: data.communityRecruit
          ? deduplicateWriting(data.recruitComment.reverse())
          : [],
        market: data.communityMarket
          ? deduplicateWriting(data.marketComment.reverse())
          : [],
      };
      setFieldItems(commentFieldData);
    }
    if (field == "writing") {
      const writingFieldData = {
        community: data.communityComment ? data.communityWriting.reverse() : [],
        recruit: data.communityRecruit ? data.recruitWriting.reverse() : [],
        market: data.communityMarket ? data.marketWriting.reverse() : [],
      };
      setFieldItems(writingFieldData);
    }
    if (field == "bookmark") {
      const bookmarkFieldData = {
        community: data.communityComment
          ? data.communityBookmark.reverse()
          : [],
        recruit: data.communityRecruit ? data.recruitBookmark.reverse() : [],
        market: data.communityMarket ? data.marketBookmark.reverse() : [],
      };
      setFieldItems(bookmarkFieldData);
    }
  }
};

export async function getPost({ collectionName, docId }: IGetPost) {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  return docSnap.data() ?? {};
}
