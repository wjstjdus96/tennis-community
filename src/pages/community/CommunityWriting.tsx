import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../components/Loading";
import { SubmitWritingButton } from "../../components/writing/SubmitWritingButto";
import WritingInput from "../../components/writing/WritingInput";
import { useEditPost } from "../../hooks/useEditPost";
import { useWritingPost } from "../../hooks/useWritingPost";
import { ICommunityWritingValue } from "../../interfaces/IValue";
import { HomeLayout } from "../../layouts/HomeLayout";
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

  const { onClickWriting, isWritingLoading } = useWritingPost({
    collectionName: "community",
  });

  const { onClickEdit, isEditLoading } = useEditPost({ state });
  const isLoading = isWritingLoading || isEditLoading;

  useEffect(() => {
    if (postId) {
      setValue("title", state.title);
      setValue("body", state.body);
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
