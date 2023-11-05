import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { ActivityFieldBtn } from "./ActivityFieldBtn";

export function MyActivities() {
  const { search } = useLocation();
  const curField = new URLSearchParams(search).get("field");

  return (
    <Wrapper>
      {curField && (
        <BoxWrapper>
          <ActivityFieldBtn
            curField={curField}
            field="writing"
            count={3}
            fieldName="작성한 게시글"
          />
          <ActivityFieldBtn
            curField={curField}
            field="comment"
            count={6}
            fieldName="작성한 댓글"
          />
          <ActivityFieldBtn
            curField={curField}
            field="bookmark"
            count={9}
            fieldName="나의 북마크"
          />
        </BoxWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 40px;
`;

const BoxWrapper = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
