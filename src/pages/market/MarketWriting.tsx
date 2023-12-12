import { useLocation, useParams } from "react-router-dom";
import { HomeLayout } from "../../layouts/HomeLayout";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { IMarketWritingValue } from "../../interfaces/IValue";
import { yupResolver } from "@hookform/resolvers/yup";
import { useWritingPost } from "../../hooks/useWritingPost";
import { useEditPost } from "../../hooks/useEditPost";
import { SelectRecruitType } from "../../components/writing/SelectRecruitType";
import { SubmitWritingButton } from "../../components/writing/SubmitWritingButto";
import WritingInput from "../../components/writing/WritingInput";
import SelectMarketCategory from "../../components/writing/SelectMarketCategory";
import ImageInput from "../../components/writing/ImageInput";

export default function MarketWriting() {
  const { postId } = useParams();
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<IMarketWritingValue>({
    mode: "onSubmit",
  });

  const { onClickWriting } = useWritingPost({ collectionName: "market" });
  const { onClickEdit } = useEditPost({ state });

  return (
    <HomeLayout>
      <Head>{postId ? "게시글 수정" : "플리마켓 게시글 작성"}</Head>
      <Body>
        <form onSubmit={handleSubmit(postId ? onClickEdit : onClickWriting)}>
          <SelectMarketCategory />
          <WritingInput name="name" text="제품명" register={register} />
          <InputRow>
            <WritingInput name="price" text="가격" register={register} />
            <WritingInput
              name="transactionMethod"
              text="거래방식"
              register={register}
            />
          </InputRow>
          <WritingInput name="detail" text="제품설명" register={register} />
          <ImageInput name="images" text="제품사진" register={register} />
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

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
`;
