import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../firebase/firebase";
import { IBoard } from "../../interfaces/IComponent";
import { IMarketPost, IPost } from "../../interfaces/IValue";
import MarketPost from "./MarketPost";
import Post from "./Post";
import PostSkeleton from "./PostSkeleton";
import MaketPostSkeleton from "./MarketPostSkeleton";

export default function Board({ title, collectionName }: IBoard) {
  const [posts, setPosts] = useState<IPost[] | IMarketPost[]>([]);
  const navigate = useNavigate();
  const limitNumber = collectionName == "market" ? 6 : 4;

  const onClickTitle = () => {
    navigate(`/${collectionName}`);
  };

  const getPosts = async () => {
    const collectionRef = collection(db, collectionName);

    const querySnapShot = await getDocs(
      query(collectionRef, orderBy("createdAt", "desc"), limit(limitNumber))
    );
    querySnapShot.forEach((doc) => {
      const postObject = {
        ...doc.data(),
        id: doc.id,
      };
      setPosts((prev: any) => [...prev, postObject]);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Wrapper>
      <Head onClick={onClickTitle}>{title}</Head>
      {collectionName == "market" ? (
        <MarketBoardBody>
          {posts.length == 0
            ? [1, 2, 3, 4, 5, 6].map(() => <MaketPostSkeleton isHome={true} />)
            : posts.map((post: any) => (
                <MarketPost post={post} isHome={true} />
              ))}
        </MarketBoardBody>
      ) : (
        <Body>
          {posts.length == 0
            ? [1, 2, 3, 4].map(() => (
                <PostSkeleton field={collectionName} isHome={true} />
              ))
            : posts.map((post: any) => <Post post={post} isHome={true} />)}
        </Body>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  overflow-x: auto;
`;

const Head = styled.div`
  height: 10px;
  background-color: ${(props) => props.theme.green[1]};
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 15px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  &:hover {
    color: ${(props) => props.theme.green[3]};
    cursor: pointer;
  }
`;

const Body = styled.div`
  & > div:last-child {
    border: none;
  }
`;

const MarketBoardBody = styled.div`
  display: grid;
  column-gap: 30px;

  @media all and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
`;
