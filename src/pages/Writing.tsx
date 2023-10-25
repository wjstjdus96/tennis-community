import { HomeAfterLoginLayout } from "../layouts/HomeLayout";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import WritingInput from "../components/WritingInput";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

export interface ICommunityValue {
  title: string;
  body: string;
}

export function Writing() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICommunityValue>();
  const navigate = useNavigate();
  const onClickSubmit: SubmitHandler<ICommunityValue> = async (data) => {
    try {
      let docData = {
        body: data.body,
        bookmarkNum: 0,
        commentNum: 0,
        createdAt: serverTimestamp(),
        creatorImage: "",
        creatorName: "임시 닉네임",
        field: "community",
        title: data.title,
        titleKeyword: data.title.split(" "),
      };
      await addDoc(collection(db, "community"), docData);
      navigate("/community");
    } catch (error) {
      alert("글쓰기에 실패하였습니다" + error);
    }
  };

  return (
    <HomeAfterLoginLayout>
      <Head>글쓰기</Head>
      <Body>
        <form onSubmit={handleSubmit(onClickSubmit)}>
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
            <SubmitBtn>글쓰기</SubmitBtn>
          </div>
        </form>
      </Body>
    </HomeAfterLoginLayout>
  );
}

const Head = styled.div`
  background-color: #cde4a0;
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
  background-color: #9bc940;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  transition: background-color 300ms ease-in-out, color 300ms ease-in-out;
  &:hover {
    box-shadow: 100px 0 0 0 rgba(0, 0, 0, 0.1) inset;
    cursor: pointer;
  }
`;
