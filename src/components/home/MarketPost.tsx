import { FaRegBookmark } from "@react-icons/all-files/fa/FaRegBookmark";
import { FaRegCommentDots } from "@react-icons/all-files/fa/FaRegCommentDots";
import { FaBookmark } from "@react-icons/all-files/fa/FaBookmark";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IMarketPost } from "../../interfaces/IValue";
import { useSetBookmark } from "../../hooks/useSetBookmark";

export default function MarketPost({
  post,
  isHome,
}: {
  post: IMarketPost;
  isHome?: boolean;
}) {
  const navigate = useNavigate();

  const { isBookmarkChecked } = useSetBookmark({
    postField: post.field,
    postId: post.id,
  });

  const onClickTitle = () => {
    navigate(`/${post.field}/${post.id}`, {
      state: { field: post.field, id: post.id },
    });
  };

  return (
    <Wrapper isHome={isHome}>
      <ItemImage url={post.images[0]}></ItemImage>
      <div>
        <ItemTitle onClick={onClickTitle}>{post.title}</ItemTitle>
        <ItemPrice>{post.price.toLocaleString()}원</ItemPrice>
        <PostInfo>
          <PostInfoItem>
            {isBookmarkChecked ? <FaBookmark /> : <FaRegBookmark />}
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

const Wrapper = styled.div<{ isHome?: boolean }>`
  border-bottom: 1px solid ${(props) => props.theme.green[1]};
  padding: ${(props) => (props.isHome ? "15px" : "15px 0")};
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
  color: ${(props) => props.theme.green[3]};
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
