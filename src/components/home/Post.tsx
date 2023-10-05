import styled from "styled-components";
import defaultProfile from "../../assets/defaultProfile.png";
import { FaRegBookmark, FaRegCommentDots } from "react-icons/fa6";
import { IPost } from "./Board";

export default function Post({ post }: { post: IPost }) {
  return (
    <Wrapper>
      <Infos>
        <InfoGroup>
          <IconItem>
            <img src={defaultProfile} />
            <div>{post.creatorName}</div>
          </IconItem>
          <div>시간</div>
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
      <Title>이것은 제목입니다</Title>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 15px;
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

const Title = styled.div`
  height: 20px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
