import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getUserActivities } from "../../../firebase/getData";
import { IFieldItemIds } from "../../../interfaces/IValue";
import { userState } from "../../../recoil/atom";
import { ActivityFieldBtn } from "./ActivityFieldBtn";
import TogglePostsList from "./TogglePostsList";

export function MyActivities() {
  const { search } = useLocation();
  const curField = new URLSearchParams(search).get("field");
  const userInfo = useRecoilValue(userState);
  const [fieldItemIds, setFieldItemIds] = useState<IFieldItemIds>();

  useEffect(() => {
    setFieldItemIds({ community: [], recruit: [], market: [] });
    if (curField) {
      getUserActivities({
        userId: userInfo.id,
        field: curField,
        setFieldItems: setFieldItemIds,
      });
    }
  }, [curField]);

  return (
    <Wrapper>
      {curField && (
        <FieldBoxWrapper>
          <ActivityFieldBtn
            curField={curField}
            field="writing"
            count={3}
            fieldName="작성한 글"
          />
          <ActivityFieldBtn
            curField={curField}
            field="comment"
            count={6}
            fieldName="댓글 단 글"
          />
          <ActivityFieldBtn
            curField={curField}
            field="bookmark"
            count={9}
            fieldName="나의 북마크"
          />
        </FieldBoxWrapper>
      )}
      {fieldItemIds != undefined && (
        <TogglePostsList fieldPostsIds={fieldItemIds} />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  @media all and (min-width: 360px) and (max-width: 767px) {
    padding: 20px 10px;
  }

  @media all and (min-width: 768px) {
    padding: 40px;
  }
`;

const FieldBoxWrapper = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 10px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
