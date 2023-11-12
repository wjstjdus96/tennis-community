import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { ActivityFieldBtn } from "./ActivityFieldBtn";
import { getUserActivities } from "../../firebase/getData";
import { useRecoilValue } from "recoil";
import { userBookmarkState, userState } from "../../recoil/atom";
import { ActivityFieldItem } from "./ActivityFieldItem";

interface IFieldItems {
  community: string[];
  recruit: string[];
  market: string[];
}

export function MyActivities() {
  const { search } = useLocation();
  const curField = new URLSearchParams(search).get("field");
  const userInfo = useRecoilValue(userState);
  const userBookmark = useRecoilValue(userBookmarkState);
  const [fieldItems, setFieldItems] = useState<IFieldItems>();

  useEffect(() => {
    if (curField == "writing" || curField == "comment") {
      getUserActivities({
        userId: userInfo.id,
        field: curField,
        setFieldItems: setFieldItems,
      });
    }
    if (curField == "bookmark") {
      setFieldItems(userBookmark);
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
      {fieldItems && (
        <PostWrapper>
          {fieldItems["community"].map((itemId: string) => (
            <ActivityFieldItem itemId={itemId} collectionName="community" />
          ))}
        </PostWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 40px;
`;

const FieldBoxWrapper = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PostWrapper = styled.div``;
