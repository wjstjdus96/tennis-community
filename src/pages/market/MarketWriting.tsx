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
import { yupResolver } from "@hookform/resolvers/yup";
import { marketWritingSchema } from "../../utils/schema";
import Loading from "../../components/Loading";

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
    defaultValues: {
      images: null,
    },
    resolver: yupResolver(marketWritingSchema),
  });

  const { onClickWriting, isWritingLoading } = useWritingPost({
    collectionName: "market",
  });
  const { onClickEdit, isEditLoading } = useEditPost({ state });
  const isLoading = isEditLoading || isWritingLoading;

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
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Head>{postId ? "게시글 수정" : "게시글 작성"}</Head>
          <Body>
            <form
              onSubmit={handleSubmit(postId ? onClickEdit : onClickWriting)}
            >
              <InputRow isFirst={true}>
                <SelectMarketCategory
                  name="category"
                  text="카테고리"
                  existing={state.category}
                  control={control}
                  errorMsg={errors.category && errors.category.message}
                />
                <WritingInput
                  name="title"
                  text="제품명"
                  register={register}
                  errorMsg={errors.title && errors.title.message}
                />
              </InputRow>
              <InputRow>
                <WritingInput
                  name="price"
                  text="가격"
                  register={register}
                  placeholder="ex) 100000"
                  errorMsg={errors.price && errors.price.message}
                />
                <WritingInput
                  name="transactionMethod"
                  text="거래방식"
                  register={register}
                  placeholder="ex) 강남역 8번 출구 앞 직거래"
                  errorMsg={
                    errors.transactionMethod && errors.transactionMethod.message
                  }
                />
              </InputRow>
              <WritingInput
                name="body"
                text="제품설명"
                register={register}
                errorMsg={errors.body && errors.body.message}
              />
              <ImageInput
                name="images"
                text="제품사진"
                register={register}
                watch={watch}
                setValue={setValue}
                getValues={getValues}
                errorMsg={errors.images && errors.images.message?.toString()}
              />
              <div>
                <SubmitWritingButton>
                  {postId ? "수정하기" : "글쓰기"}
                </SubmitWritingButton>
              </div>
            </form>
          </Body>
        </>
      )}
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
