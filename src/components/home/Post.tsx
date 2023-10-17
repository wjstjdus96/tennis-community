import styled from "styled-components";
import defaultProfile from "../../assets/defaultProfile.png";
import { FaRegBookmark, FaRegCommentDots } from "react-icons/fa6";
import { IPost } from "./Board";
import { getElapsedTime } from "../../utils/getElapsedTime";
import { ref, getDownloadURL, listAll, getStorage } from "firebase/storage";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Post({
  post,
  isHome,
}: {
  post: IPost;
  isHome: boolean;
}) {
  const navigate = useNavigate();
  const storage = getStorage();
  const imageRef = ref(storage, `${post.creatorImage}`);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (post.creatorImage) {
      getDownloadURL(imageRef).then((url) => {
        setProfileImage(url);
      });
    } else {
      setProfileImage(defaultProfile);
    }
  });

  const onClickTitle = () => {
    navigate(`/${post.field}/${post.id}`);
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
      {!isHome && <Body>{post.body}</Body>}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ isHome: boolean }>`
  padding: ${(props) => (props.isHome ? "15px" : "15px 3px")};
  font-family: "Noto Sans KR", sans-serif;
  border-bottom: 1px solid #cde4a0;
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
`;
