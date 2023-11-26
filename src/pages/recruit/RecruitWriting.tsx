import styled from "styled-components";
import { HomeLayout } from "../../layouts/HomeLayout";
import { useForm, SubmitHandler } from "react-hook-form";
import { IRecruitWritingValue } from "../../interfaces/IValue";
import WritingInput from "../../components/writing/WritingInput";
import { SubmitWritingButton } from "../../components/writing/SubmitWritingButto";

export default function RecruitWriting() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IRecruitWritingValue>();

  const onClickWriting = () => {};

  return (
    <HomeLayout>
      <Head>{"게시글 작성"}</Head>
      <Body>
        <form onSubmit={handleSubmit(onClickWriting)}>
          <WritingInput
            name="type"
            text="모집 유형"
            register={register}
            errorMsg={errors.title && "유형을 선택해주세요"}
          />
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
            <SubmitWritingButton>{"글쓰기"}</SubmitWritingButton>
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
