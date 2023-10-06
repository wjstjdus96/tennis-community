import styled from "styled-components";
import { FaRegBookmark, FaRegCommentDots } from "react-icons/fa6";

export default function MarketPost({ post }: { post: any }) {
  return (
    <Wrapper>
      <ItemImage></ItemImage>
      <ItemInfo>
        <div>{post.itemName}</div>
        <div>{post.price}</div>
        <PostInfo>
          <PostInfoItem>
            <FaRegBookmark />
            <div>{post.bookmarkNum}</div>
          </PostInfoItem>
          <PostInfoItem>
            <FaRegCommentDots />
            <div>{post.commentNum}</div>
          </PostInfoItem>
        </PostInfo>
      </ItemInfo>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-bottom: 1px solid #cde4a0;
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr 8fr;
  gap: 15px;
`;

const ItemImage = styled.div`
  background-color: green;
  width: 65px;
  height: 65px;
`;

const ItemInfo = styled.div``;

const PostInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const PostInfoItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-left: 15px;
  & > :first-child {
    margin-right: 5px;
  }
`;
