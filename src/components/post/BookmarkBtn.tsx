import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import styled from "styled-components";
import { useSetBookmark } from "../../hooks/useSetBookmark";
import { IBookmarkBtn } from "../../interfaces/IComponent";

export default function BookmarkBtn({
  bookmarkNum,
  collectionName,
  docId,
}: IBookmarkBtn) {
  const { isBookmarkChecked, toggleBookmark } = useSetBookmark({
    postField: collectionName,
    postId: docId,
  });

  return (
    <Wrapper isChecked={isBookmarkChecked} onClick={toggleBookmark}>
      {isBookmarkChecked ? <FaBookmark /> : <FaRegBookmark />}
      <div>{bookmarkNum}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ isChecked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isChecked ? "rgba(155,201,64,0.9)" : "rgba(155,201,64,0.5)"};

  color: ${(props) => (props.isChecked ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.8)")};
  div {
    align-self: baseline;
  }
  &:hover {
    cursor: pointer;
  }
`;
