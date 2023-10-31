import styled from "styled-components";
import { FaRegBookmark, FaRegCommentDots } from "react-icons/fa6";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IMarketPost } from "../../interfaces/IValue";

export default function MarketPost({ post }: { post: IMarketPost }) {
  const navigate = useNavigate();
  const storage = getStorage();
  const imageRef = ref(storage, `${post.itemImage}`);
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    getDownloadURL(imageRef).then((url) => {
      setImage(url);
    });
  });

  const onClickTitle = () => {
    navigate(`/${post.field}/${post.id}`);
  };

  return (
    <Wrapper>
      <ItemImage url={image}></ItemImage>
      <div>
        <ItemTitle onClick={onClickTitle}>{post.itemName}</ItemTitle>
        <ItemPrice>{post.price.toLocaleString()}원</ItemPrice>
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
      </div>
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

const ItemImage = styled.div<{ url: string }>`
  background-image: url(${(props) => props.url});
  background-size: cover;
  width: 65px;
  height: 65px;
  border-radius: 10px;
`;

const ItemTitle = styled.div`
  &:hover {
    font-weight: 600;
    cursor: pointer;
  }
`;

const ItemPrice = styled.div`
  color: #2a6c23;
  font-size: 14px;
`;

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
