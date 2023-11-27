import styled from "styled-components";
import { FaBookmark, FaRegBookmark, FaRegCommentDots } from "react-icons/fa6";
import { getElapsedTime } from "../../utils/getElapsedTime";
import { useNavigate } from "react-router-dom";
import { IPost } from "../../interfaces/IValue";
import { IUserBookmarkState, userBookmarkState } from "../../recoil/atom";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import PostWriter from "./PostWriter";

export default function Post({
  post,
  isHome,
}: {
  post: IPost;
  isHome: boolean;
}) {
  const navigate = useNavigate();
  const userBookmark = useRecoilValue(userBookmarkState);
  const [isBookmarkChecked, setIsBookmarkChecked] = useState<boolean>();

  useEffect(() => {
    if (post.field == "community") {
      setIsBookmarkChecked(
        userBookmark[post.field as keyof IUserBookmarkState].includes(post.id)
      );
    }
    // 사람 모집 게시판 완성 후 수정
    if (post.field == "recruit") {
      setIsBookmarkChecked(false);
    }
  }, [userBookmark]);

  const onClickTitle = () => {
    navigate(`/${post.field}/${post.id}`, {
      state: { field: post.field, id: post.id },
    });
  };

  return (
    <Wrapper isHome={isHome}>
      <Infos>
        <InfoGroup>
          <PostWriter writerId={post.creatorId} />
          <div>{getElapsedTime(post.createdAt.seconds)}</div>
        </InfoGroup>
        <InfoGroup>
          <IconItem>
            {isBookmarkChecked ? <FaBookmark /> : <FaRegBookmark />}
            <div>{post.bookmarkNum}</div>
          </IconItem>
          <IconItem>
            <FaRegCommentDots />
            <div>{post.commentNum}</div>
          </IconItem>
        </InfoGroup>
      </Infos>
      <Title type={post.type}>
        {post.type && <p>{post.type}</p>}
        <div onClick={onClickTitle}>{post.title}</div>
      </Title>
      {!isHome && (
        <Body>
          <div>{post.body}</div>
        </Body>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ isHome: boolean }>`
  padding: ${(props) => (props.isHome ? "15px" : "15px 3px")};
  font-family: "Noto Sans KR", sans-serif;
  border-bottom: 1px solid ${(props) => props.theme.green[1]};
  max-width: 100%;
`;

const Infos = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 10px;
  & > div {
    display: flex;
  }
`;

const Title = styled.div<{ type?: string }>`
  display: flex;
  gap: 10px;
  align-items: center;
  & > p {
    min-width: 50px;
    max-width: 70px;
    color: grey;
    font-size: 12px;
    font-weight: 700;
    margin: 0;
    border: 1px solid grey;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: baseline;
    padding: 3px;
  }
  & > div {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  & > div:hover {
    font-weight: 600;
    cursor: pointer;
  }
`;

const InfoGroup = styled.div`
  display: flex;
  align-items: center;
  &:first-child > div:nth-child(n + 2) {
    position: relative;
    margin-left: 10px;
    padding-left: 15px;
  }
  &:first-child > div:nth-child(n + 2)::after {
    position: absolute;
    left: 0;
    content: "·";
  }
  &:last-child > div:nth-child(n + 2) {
    position: relative;
    margin-left: 5px;
    padding-left: 10px;
  }
`;

const IconItem = styled.div`
  display: flex;
  align-items: center;
  & > :first-child {
    margin-right: 5px;
  }
`;

const Body = styled.div`
  font-size: 13px;
  color: grey;
  margin-top: 10px;
  max-width: 100%;
  & > div {
    height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
