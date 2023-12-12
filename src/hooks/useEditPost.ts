import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { updateDocData } from "../firebase/updateData";
import { IUseEditPost } from "../interfaces/IFunction";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const useEditPost = ({ state }: IUseEditPost) => {
  const navigate = useNavigate();

  const onClickEdit: SubmitHandler<any> = async (data) => {
    try {
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
      navigate(`/${state.field}/${state.id}`, {
        state: { field: state.field, id: state.id },
      });
    } catch (e) {
      alert("게시글 수정에 실패하였습니다");
    }
  };

  return { onClickEdit };
};
