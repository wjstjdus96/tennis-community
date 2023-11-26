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
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { updateUserArrayData } from "../../firebase/updateData";

export default function RecruitWriting() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<IRecruitWritingValue>();
  const userInfo = useRecoilValue(userState);
  const navigate = useNavigate();

  const onClickWriting = async (data: any) => {
    console.log(data);
    try {
      let docData = {
        body: data.body,
        bookmarkNum: 0,
        commentNum: 0,
        createdAt: serverTimestamp(),
        creatorImage: userInfo.photo,
        creatorName: userInfo.displayName,
        creatorId: userInfo.id,
        field: "recruit",
        title: data.title,
        type: data.type,
        titleKeyword: data.title.split(" "),
      };
      await addDoc(collection(db, "recruit"), docData).then((docRef) => {
        updateUserArrayData({
          userId: userInfo.id,
          docField: "recruitWriting",
          changing: "add",
          arrayItem: docRef.id,
        });
      });
      navigate("/recruit");
    } catch (error) {
      console.log(data);
      alert("글쓰기에 실패하였습니다" + error);
    }
  };

  return (
    <HomeLayout>
      <Head>게시글 작성</Head>
      <Body>
        <form onSubmit={handleSubmit(onClickWriting)}>
          <SelectRecruitType name="type" control={control} />
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
            <SubmitWritingButton>글쓰기</SubmitWritingButton>
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
