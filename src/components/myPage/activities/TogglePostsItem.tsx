import styled, { keyframes } from "styled-components";
import { ActivityFieldItem } from "./ActivityFieldItem";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { useState } from "react";

interface ITogglePostsItem {
  postsIds: string[];
  fieldKor: string;
  fieldEng: string;
}

export default function TogglePostsItem({
  postsIds,
  fieldKor,
  fieldEng,
}: ITogglePostsItem) {
  const [isExpanded, setIsExpanded] = useState(true);

  const onClickArrow = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Wrapper>
      <ToggleHead>
        {isExpanded ? (
          <BiSolidUpArrow size={10} onClick={onClickArrow} />
        ) : (
          <BiSolidDownArrow size={10} onClick={onClickArrow} />
        )}
        <div>{fieldKor}</div>
        <div>( {postsIds.length} )</div>
      </ToggleHead>

      {isExpanded && (
        <>
          {postsIds.map((postId: string) => (
            <ActivityFieldItem itemId={postId} collectionName={fieldEng} />
          ))}
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const ToggleHead = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${(props) => props.theme.green[3]};
  & > div:nth-child(2) {
    font-weight: 700;
    font-size: 14px;
  }
  & > div:last-child {
    font-size: 12px;
    margin-left: -5px;
  }
`;
