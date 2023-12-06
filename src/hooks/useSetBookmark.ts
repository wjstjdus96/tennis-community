import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  IUserBookmarkState,
  userBookmarkState,
  userState,
} from "../recoil/atom";
import useDidMountEffect from "./useDidMountEffect";
import { updateOneData, updateUserArrayData } from "../firebase/updateData";
import { checkIsLogin } from "../utils/checkIsLogin";
import { IuseSetBookmark } from "../interfaces/IFunction";

export const useSetBookmark = ({ postField, postId }: IuseSetBookmark) => {
  const isLogin = checkIsLogin();
  const userBookmark = useRecoilValue(userBookmarkState);
  const userInfo = useRecoilValue(userState);
  const [isBookmarkChecked, setIsBookmarkChecked] = useState<boolean>(
    userBookmark[postField as keyof IUserBookmarkState].includes(postId)
  );

  //   useEffect(() => {
  //     console.log("변경");

  //     setIsBookmarkChecked(
  //       userBookmark[postField as keyof IUserBookmarkState].includes(postId)
  //     );
  //   }, [userBookmark]);

  const toggleBookmark = async () => {
    if (!isLogin) {
      alert("로그인 후 사용 가능합니다.");
    }
    if (isLogin) {
      setIsBookmarkChecked((prev) => !prev);
    }
  };

  useDidMountEffect(() => {
    console.log(isBookmarkChecked);
    if (isBookmarkChecked) {
      updateOneData({
        collectionName: postField,
        docId: postId,
        docField: "bookmarkNum",
        incrementNum: 1,
      });
      updateUserArrayData({
        userId: userInfo.id,
        docField: postField + "Bookmark",
        changing: "add",
        arrayItem: postId,
      });
    } else {
      updateOneData({
        collectionName: postField,
        docId: postId,
        docField: "bookmarkNum",
        incrementNum: -1,
      });
      updateUserArrayData({
        userId: userInfo.id,
        docField: postField + "Bookmark",
        changing: "remove",
        arrayItem: postId,
      });
    }
  }, [isBookmarkChecked]);

  return { isBookmarkChecked, toggleBookmark };
};
