import { HomeLayout } from "../../layouts/HomeLayout";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import WritingInput from "../../components/writing/WritingInput";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { ICommunityWritingValue } from "../../interfaces/IValue";
import { useEffect, useState } from "react";
import { updateDocData, updateUserArrayData } from "../../firebase/updateData";
import { userState } from "../../recoil/atom";
import { useRecoilValue } from "recoil";
import { SubmitWritingButton } from "../../components/writing/SubmitWritingButto";
import { yupResolver } from "@hookform/resolvers/yup";
import { communityWritingSchema } from "../../utils/schema";

export default function CommunityWriting() {
  const { postId } = useParams();
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ICommunityWritingValue>({
    mode: "onSubmit",
    resolver: yupResolver(communityWritingSchema),
  });
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);

  const onClickWriting: SubmitHandler<ICommunityWritingValue> = async (
    data
  ) => {
    try {
      let docData = {
        body: data.body,
        bookmarkNum: 0,
        commentNum: 0,
        createdAt: serverTimestamp(),
        creatorImage: userInfo.photo,
        creatorName: userInfo.displayName,
        creatorId: userInfo.id,
        field: "community",
        title: data.title,
        titleKeyword: data.title.split(" "),
      };
      await addDoc(collection(db, "community"), docData).then((docRef) => {
        updateUserArrayData({
          userId: userInfo.id,
          docField: "communityWriting",
          changing: "add",
          arrayItem: docRef.id,
        });
      });
      navigate("/community");
    } catch (error) {
      alert("글쓰기에 실패하였습니다" + error);
    }
  };

  const onClickEdit: SubmitHandler<ICommunityWritingValue> = async (data) => {
    try {
      let newData = {
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
      setValue("title", state.title);
      setValue("body", state.body);
    }
  }, [postId]);

  return (
    <HomeLayout>
      <Head>{postId ? "게시글 수정" : "게시글 작성"}</Head>
      <Body>
        <form onSubmit={handleSubmit(postId ? onClickEdit : onClickWriting)}>
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
