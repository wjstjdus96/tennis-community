import styled from "styled-components";
import Post from "./Post";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useState, useEffect } from "react";

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
}

export default function Board({ title, collectionName }: IBoard) {
  const [posts, setPosts] = useState<IPost[]>([]);
  const getPosts = async () => {
    const querySnapShot = await getDocs(collection(db, collectionName));
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
      <Body>
        {posts.map((post: any) => (
          <Post post={post} />
        ))}
      </Body>
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
