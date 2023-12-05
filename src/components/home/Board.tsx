import styled from "styled-components";
import Post from "./Post";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useState, useEffect } from "react";
import MarketPost from "./MarketPost";
import { Link, useNavigate } from "react-router-dom";
import { IBoard } from "../../interfaces/IComponent";
import { IMarketPost, IPost } from "../../interfaces/IValue";

export default function Board({ title, collectionName }: IBoard) {
  const [posts, setPosts] = useState<IPost[] | IMarketPost[]>([]);
  const navigate = useNavigate();

  const onClickTitle = () => {
    navigate(`/${collectionName}`);
  };

  const getPosts = async () => {
    const collectionRef = collection(db, collectionName);
    const limitNumber = collectionName == "market" ? 6 : 4;
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
          {posts.map((post: any) => (
            <MarketPost post={post} />
          ))}
        </MarketBoardBody>
      ) : (
        <Body>
          {posts.map((post: any) => (
            <Post post={post} isHome={true} />
          ))}
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
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;
