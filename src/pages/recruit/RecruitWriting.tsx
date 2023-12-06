import styled from "styled-components";
import { HomeLayout } from "../../layouts/HomeLayout";
import { useForm, SubmitHandler } from "react-hook-form";
import { IRecruitWritingValue } from "../../interfaces/IValue";
import WritingInput from "../../components/writing/WritingInput";
import { SubmitWritingButton } from "../../components/writing/SubmitWritingButto";
import { SelectRecruitType } from "../../components/writing/SelectRecruitType";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { updateDocData, updateUserArrayData } from "../../firebase/updateData";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { recruitWritingSchema } from "../../utils/schema";
import { useWritingPost } from "../../hooks/useWritingPost";

export default function RecruitWriting() {
  const { postId } = useParams();
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<IRecruitWritingValue>({
    mode: "onSubmit",
    resolver: yupResolver(recruitWritingSchema),
  });
  const navigate = useNavigate();

  const { onClickWriting } = useWritingPost({ collectionName: "recruit" });

  const onClickEdit: SubmitHandler<IRecruitWritingValue> = async (data) => {
    try {
      let newData = {
        type: data.type,
        body: data.body,
        title: data.title,
        titleKeyword: data.title.split(" "),
      };
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

  useEffect(() => {
    if (postId) {
      setValue("type", state.type);
      setValue("title", state.title);
      setValue("body", state.body);
    }
  }, [postId]);

  return (
    <HomeLayout>
      <Head>{postId ? "게시글 수정" : "게시글 작성"}</Head>
      <Body>
        <form onSubmit={handleSubmit(postId ? onClickEdit : onClickWriting)}>
          <SelectRecruitType
            name="type"
            control={control}
            errorMsg={errors.type && errors.type.message}
          />
          <WritingInput
            name="title"
            text="제목"
            register={register}
            errorMsg={errors.title && errors.title.message}
          />
          <WritingInput
            name="body"
            text="본문"
            register={register}
            errorMsg={errors.body && errors.body.message}
          />
          <div>
            <SubmitWritingButton>
              {postId ? "수정하기" : "글쓰기"}
            </SubmitWritingButton>
          </div>
        </form>
      </Body>
    </HomeLayout>
  );
}

const Head = styled.div`
  background-color: ${(props) => props.theme.green[1]};
  padding: 20px;
  border-radius: 15px;
`;

const Body = styled.div`
  form {
    display: flex;
    flex-direction: column;
    & > div:last-child {
      align-self: end;
    }
  }
`;
