import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { deletePost } from "../../firebase/deleteData";
import { updateUserArrayData } from "../../firebase/updateData";
import { IPostBody } from "../../interfaces/IComponent";
import { userState } from "../../recoil/atom";
import BookmarkBtn from "./BookmarkBtn";
import { EditDeleteBtn } from "./EditDeleteBtns";
import MarketPostBodyDetail from "./MarketPostBodyDetail";

export function PostBody({ postData }: IPostBody) {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);
  const { boardField } = useParams();

  const clickDeletePost = () => {
    if (window.confirm("게시물을 삭제하시겠습니까?")) {
      deletePost({ collectionName: postData.field, docId: postData.id });
      updateUserArrayData({
        userId: userInfo.id,
        docField: postData.field + "Writing",
        changing: "remove",
        arrayItem: postData.id,
      });
      navigate(`/${postData.field}`);
    }
  };

  const clickEditPost = () => {
    navigate(`/${postData.field}/edit/${postData.id}`, {
      state: postData,
    });
  };

  return (
    <Wrapper>
      <Title>
        {boardField == "recruit" && <p>{postData.type}</p>}
        <div>{postData.title}</div>
      </Title>
      {boardField == "market" ? (
        <MarketPostBodyDetail postData={postData} />
      ) : (
        <div>{postData.body}</div>
      )}
      <div>
        <BookmarkBtn
          bookmarkNum={postData.bookmarkNum}
          collectionName={postData.field}
          docId={postData.id}
        />
      </div>
      {userInfo.id == postData.creatorId && (
        <EditDeleteBtn
          clickDelelteBtn={clickDeletePost}
          clickEditBtn={clickEditPost}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  white-space: pre-wrap;
  & > div:nth-child(3) {
    margin: 30px 0;
    display: flex;
    justify-content: center;
  }
`;

const Title = styled.div`
  & > p {
    width: 50px;
    color: ${(props) => props.theme.green[3]};
    font-size: 12px;

    margin: 0;
    border: 2px solid ${(props) => props.theme.green[1]};
    background-color: ${(props) => props.theme.green[0]};
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: baseline;
    padding: 3px;
    margin-bottom: 10px;
  }

  & > div {
    font-size: 30px;
    margin-bottom: 20px;
    font-weight: 700;
  }
`;
