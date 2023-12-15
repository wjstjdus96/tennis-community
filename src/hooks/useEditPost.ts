import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { updateDocData } from "../firebase/updateData";
import { IUseEditPost } from "../interfaces/IFunction";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

export const useEditPost = ({ state }: IUseEditPost) => {
  const navigate = useNavigate();
  const [isEditLoading, setIsEditLoading] = useState(false);

  if (typeof state == "string") {
    const onClickEdit = () => console.log("state");
    return { onClickEdit };
  }

  const onClickEdit: SubmitHandler<any> = async (data) => {
    try {
      setIsEditLoading(true);
      let newData = {
        body: data.body,
        title: data.title,
        titleKeyword: data.title.split(" "),
      };

      if (state.field == "recruit") {
        let addDocData = {
          type: data.type,
        };
        newData = { ...newData, ...addDocData };
      }

      if (state.field == "market") {
        const storage = getStorage();
        const imageArray: string[] = [];
        for (const image of data.images) {
          const imageRef = ref(storage, `market/${image.name}`);
          const snapshot = await uploadBytes(imageRef, image);
          const downloadURL = await getDownloadURL(snapshot.ref);
          imageArray.push(downloadURL);
        }
        let addDocData = {
          category: data.category,
          price: Number(data.price),
          transactionMethod: data.transactionMethod,
          images: imageArray,
        };
        newData = { ...newData, ...addDocData };
      }

      updateDocData({
        collectionName: state.field,
        docId: state.id,
        newData: newData,
      });
      setIsEditLoading(false);
      navigate(`/${state.field}/${state.id}`, {
        state: { field: state.field, id: state.id },
      });
    } catch (e) {
      alert("게시글 수정에 실패하였습니다");
    }
  };

  return { onClickEdit, isEditLoading };
};
