import styled from "styled-components";
import { FaRegBookmark, FaRegCommentDots } from "react-icons/fa6";
import { getElapsedTime } from "../../utils/getElapsedTime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../firebase/getImage";
import { IPost } from "../../interfaces/IValue";

export default function Post({
  post,
  isHome,
}: {
  post: IPost;
  isHome: boolean;
}) {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    getImage({ imageURL: post.creatorImage, setImage: setProfileImage });
  });

  const onClickTitle = () => {
    navigate(`/${post.field}/${post.id}`, {
      state: { field: post.field, id: post.id },
    });
  };

  return (
    <Wrapper isHome={isHome}>
      <Infos>
        <InfoGroup>
          <IconItem>
            <img src={profileImage} />
            <div>{post.creatorName}</div>
          </IconItem>
          <div>{getElapsedTime(post.createdAt.seconds)}</div>
        </InfoGroup>
        <InfoGroup>
          <IconItem>
            <FaRegBookmark />
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
  display: grid;
  grid-template-columns: ${(props) => (props.type ? "1fr 7fr" : "1fr")};
  gap: 10px;
  justify-content: center;
  align-items: flex-start;
  & > p {
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
    height: 20px;
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
  img {
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
  }
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
