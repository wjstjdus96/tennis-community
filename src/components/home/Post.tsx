import { FaRegBookmark } from "@react-icons/all-files/fa/FaRegBookmark";
import { FaRegCommentDots } from "@react-icons/all-files/fa/FaRegCommentDots";
import { FaBookmark } from "@react-icons/all-files/fa/FaBookmark";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSetBookmark } from "../../hooks/useSetBookmark";
import { IPost } from "../../interfaces/IValue";
import { getElapsedTime } from "../../utils/getTime";
import WriterInfo from "../WriterInfo";

export default function Post({
  post,
  isHome,
}: {
  post: IPost;
  isHome: boolean;
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
    <Wrapper isHome={isHome} field={post.field}>
      <Infos>
        <InfoGroup>
          <WriterInfo writerId={post.creatorId} />
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

const Wrapper = styled.div<{ isHome: boolean; field: string }>`
  padding: ${(props) =>
    props.isHome
      ? props.field == "community"
        ? "1.03rem 1rem "
        : "1rem"
      : "15px 3px"};
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
    color: ${(props) => props.theme.green[3]};
    font-size: 12px;
    margin: 0;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: baseline;
    padding: 2px 3px;
    border: 2px solid ${(props) => props.theme.green[1]};
    background-color: ${(props) => props.theme.green[0]};
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
