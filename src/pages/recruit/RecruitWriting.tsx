import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { SelectRecruitType } from "../../components/writing/SelectRecruitType";
import { SubmitWritingButton } from "../../components/writing/SubmitWritingButto";
import WritingInput from "../../components/writing/WritingInput";
import { useEditPost } from "../../hooks/useEditPost";
import { useWritingPost } from "../../hooks/useWritingPost";
import { IRecruitWritingValue } from "../../interfaces/IValue";
import { HomeLayout } from "../../layouts/HomeLayout";
import { recruitWritingSchema } from "../../utils/schema";

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

  const { onClickWriting } = useWritingPost({ collectionName: "recruit" });
  const { onClickEdit } = useEditPost({ state });

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
