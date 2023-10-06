import styled from "styled-components";
import Post from "./Post";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useState, useEffect } from "react";
import MarketPost from "./MarketPost";

interface IBoard {
  title: string;
  collectionName: string;
}

export interface IPost {
  body: string;
  bookmarkNum: number;
  commentNum: number;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  creatorImage: string;
  creatorName: string;
  id: string;
  title: string;
  type?: string;
}

export interface IMarketPost {
  title: string;
}

export default function Board({ title, collectionName }: IBoard) {
  const [posts, setPosts] = useState<IPost[] | IMarketPost[]>([]);
  const getPosts = async () => {
    const collectionRef = collection(db, collectionName);
    const querySnapShot = await getDocs(
      query(collectionRef, orderBy("createdAt", "desc"), limit(6))
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
      <Head>{title}</Head>
      {collectionName == "market" ? (
        <MarketBoardBody>
          {posts.map((post: any) => (
            <MarketPost post={post} />
          ))}
        </MarketBoardBody>
      ) : (
        <Body>
          {posts.map((post: any) => (
            <Post post={post} />
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
  background-color: #cde4a0;
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 15px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
`;

const Body = styled.div`
  & > div:last-child {
    border: none;
  }
`;

const MarketBoardBody = styled.div`
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;
