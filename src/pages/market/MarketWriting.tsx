import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import ImageInput from "../../components/writing/ImageInput";
import SelectMarketCategory from "../../components/writing/SelectMarketCategory";
import { SubmitWritingButton } from "../../components/writing/SubmitWritingButto";
import WritingInput from "../../components/writing/WritingInput";
import { useEditPost } from "../../hooks/useEditPost";
import { useWritingPost } from "../../hooks/useWritingPost";
import { IMarketWritingValue } from "../../interfaces/IValue";
import { HomeLayout } from "../../layouts/HomeLayout";

export default function MarketWriting() {
  const { postId } = useParams();
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
    getValues,
  } = useForm<IMarketWritingValue>({
    mode: "onSubmit",
  });

  const { onClickWriting } = useWritingPost({ collectionName: "market" });
  const { onClickEdit } = useEditPost({ state });

  useEffect(() => {
    if (postId) {
      setValue("title", state.title);
      setValue("category", state.category);
      setValue("price", state.price);
      setValue("transactionMethod", state.transactionMethod);
      setValue("body", state.body);
      setValue("images", state.images);
    }
  }, [postId]);

  return (
    <HomeLayout>
      <Head>{postId ? "게시글 수정" : "게시글 작성"}</Head>
      <Body>
        <form onSubmit={handleSubmit(postId ? onClickEdit : onClickWriting)}>
          <InputRow isFirst={true}>
            <SelectMarketCategory
              name="category"
              text="카테고리"
              existing={state.category}
              control={control}
            />
            <WritingInput name="title" text="제품명" register={register} />
          </InputRow>
          <InputRow>
            <WritingInput name="price" text="가격" register={register} />
            <WritingInput
              name="transactionMethod"
              text="거래방식"
              register={register}
            />
          </InputRow>
          <WritingInput name="body" text="제품설명" register={register} />
          <ImageInput
            name="images"
            text="제품사진"
            register={register}
            watch={watch}
            setValue={setValue}
            getValues={getValues}
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

const InputRow = styled.div<{ isFirst?: boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isFirst ? "110px auto" : "1fr 2fr"};
  gap: 3rem;
`;
