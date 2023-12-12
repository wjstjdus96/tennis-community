import { SubmitHandler } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atom";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { updateUserArrayData } from "../firebase/updateData";
import { ICommunityWritingValue } from "../interfaces/IValue";
import { IUserWritingPost } from "../interfaces/IFunction";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const useWritingPost = ({ collectionName }: IUserWritingPost) => {
  const userInfo = useRecoilValue(userState);
  const navigate = useNavigate();

  const onClickWriting: SubmitHandler<any> = async (data: any) => {
    try {
      let docData = {
        body: data.body,
        bookmarkNum: 0,
        commentNum: 0,
        createdAt: serverTimestamp(),
        creatorId: userInfo.id,
        field: collectionName,
        title: data.title,
        titleKeyword: data.title.split(" "),
      };

      if (collectionName == "recruit") {
        let addDocData = {
          type: data.type,
        };
        docData = { ...docData, ...addDocData };
      }

      if (collectionName == "market") {
        const storage = getStorage();
        const imageArray: string[] = [];
        for (const image of data.images) {
          const imageRef = ref(storage, `market/${image.name}`);
          const snapshot = await uploadBytes(imageRef, image);
          const downloadURL = await getDownloadURL(snapshot.ref);
          imageArray.push(downloadURL);
        }
        Array.from(data.images).map(async (image: any) => {
          const imageRef = ref(storage, `market/${image.name}`);
          await uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              imageArray.push(url);
            });
          });
        });
        let addDocData = {
          category: data.category,
          price: Number(data.price),
          transactionMethod: data.transactionMethod,
          images: imageArray,
        };
        docData = { ...docData, ...addDocData };
      }

      await addDoc(collection(db, collectionName), docData).then((docRef) => {
        updateUserArrayData({
          userId: userInfo.id,
          docField: collectionName + "Writing",
          changing: "add",
          arrayItem: docRef.id,
        });
      });
      navigate(`/${collectionName}`);
    } catch (error) {
      alert("글쓰기에 실패하였습니다" + error);
    }
  };

  return { onClickWriting };
};
