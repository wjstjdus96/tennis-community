import { useState } from "react";
import { IoMdArrowDown } from "@react-icons/all-files/io/IoMdArrowDown";
import { IoMdArrowUp } from "@react-icons/all-files/io/IoMdArrowUp";
import styled from "styled-components";
import { ITogglePostsItem } from "../../../interfaces/IComponent";
import { ActivityFieldItem } from "./ActivityFieldItem";

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
          <IoMdArrowUp size={10} onClick={onClickArrow} />
        ) : (
          <IoMdArrowDown size={10} onClick={onClickArrow} />
        )}
        <div>{fieldKor}</div>
        <div>( {postsIds.length} )</div>
      </ToggleHead>
      {isExpanded && (
        <ToggleBody>
          {postsIds.length == 0 ? (
            <p>해당 분야의 게시글이 없습니다</p>
          ) : (
            postsIds.map((postId: string) => (
              <ActivityFieldItem itemId={postId} collectionName={fieldEng} />
            ))
          )}
        </ToggleBody>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const ToggleHead = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  & > div:nth-child(2) {
    font-size: 14px;
  }
  & > div:last-child {
    font-size: 12px;
    margin-left: -5px;
  }
`;

const ToggleBody = styled.div`
  & > p {
    margin-left: 15px;
    font-size: 15px;
    color: gray;
  }
`;
