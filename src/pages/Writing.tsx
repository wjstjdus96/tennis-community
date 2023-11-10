import { HomeLayout } from "../layouts/HomeLayout";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import WritingInput from "../components/post/WritingInput";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
  FieldValue,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { ICommunityWritingValue } from "../interfaces/IValue";
import { useEffect, useState } from "react";
import { updateDocData } from "../firebase/updateData";
import { userState } from "../recoil/atom";
import { useRecoilValue } from "recoil";

export function Writing() {
  const { postId } = useParams();
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ICommunityWritingValue>();
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
        updateDoc(doc(db, "users", userInfo.id), {
          communityWriting: arrayUnion(docRef.id),
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
            errorMsg={errors.title && "제목을 입력해주세요"}
          />
          <WritingInput
            name="body"
            text="본문"
            register={register}
            errorMsg={errors.body && "본문을 작성해주세요"}
          />
          <div>
            <SubmitBtn>{postId ? "수정하기" : "글쓰기"}</SubmitBtn>
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

const SubmitBtn = styled.button`
  display: flex;
  align-items: center;
  margin: 20px 0;
  padding: 8px 13px;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => props.theme.green[2]};
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  transition: background-color 300ms ease-in-out, color 300ms ease-in-out;
  &:hover {
    box-shadow: 100px 0 0 0 rgba(0, 0, 0, 0.1) inset;
    cursor: pointer;
  }
`;
