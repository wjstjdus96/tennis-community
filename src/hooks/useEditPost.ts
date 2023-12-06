import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { updateDocData } from "../firebase/updateData";
import { IUseEditPost } from "../interfaces/IFunction";

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
