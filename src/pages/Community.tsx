import { HomeAfterLoginLayout } from "../layouts/HomeLayout";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { HiOutlineSortDescending, HiPencil } from "react-icons/hi";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import Post from "../components/home/Post";
import { Pagination } from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import BoardFilter from "../components/BoardFilter";

export default function Community() {
  const navigate = useNavigate();
  const [totalPosts, setTotalPosts] = useState<any>([]);
  const [posts, setPosts] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterType, setFilterType] = useState("최신순");
  const [isExpanded, setIsExpanded] = useState(false);
  const postsPerPage = 5;

  const getPosts = async (keyword: string) => {
    const collectionRef = collection(db, "community");
    const querySnapShot = await getDocs(
      keyword
        ? query(
            collectionRef,
            where("titleKeyword", "array-contains", keyword),
            orderBy("createdAt", "desc")
          )
        : query(collectionRef, orderBy("createdAt", "desc"))
    );

    querySnapShot.forEach((doc) => {
      const postObject = {
        ...doc.data(),
        id: doc.id,
      };
      setTotalPosts((prev: any) => [...prev, postObject]);
    });
  };

  const getPostsByPage = async (
    offset: number,
    field: string,
    keyword: string
  ) => {
    const collectionRef = collection(db, field);
    if (offset == 0) {
      const querySnapShot = await getDocs(
        keyword
          ? query(
              collectionRef,
              where("titleKeyword", "array-contains", keyword),
              orderBy("createdAt", "desc"),
              limit(postsPerPage)
            )
          : query(
              collectionRef,
              orderBy("createdAt", "desc"),
              limit(postsPerPage)
            )
      );
      querySnapShot.forEach((doc) => {
        const postObject = {
          ...doc.data(),
          id: doc.id,
        };
        setPosts((prev: any) => [...prev, postObject]);
      });
    } else {
      const prev = keyword
        ? query(
            collectionRef,
            where("titleKeyword", "array-contains", keyword),
            orderBy("createdAt", "desc"),
            limit(offset)
          )
        : query(collectionRef, orderBy("createdAt", "desc"), limit(offset));
      const documentSnapshots = await getDocs(prev);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      const next = keyword
        ? query(
            collectionRef,
            where("titleKeyword", "array-contains", keyword),
            orderBy("createdAt", "desc"),
            startAfter(lastVisible),
            limit(postsPerPage)
          )
        : query(
            collectionRef,
            orderBy("createdAt", "desc"),
            startAfter(lastVisible),
            limit(postsPerPage)
          );

      (await getDocs(next)).forEach((doc: any) => {
        const postObject = {
          ...doc.data(),
          id: doc.id,
        };
        setPosts((prev: any) => [...prev, postObject]);
      });
    }
  };

  const onClickWritingBtn = () => {
    navigate("/community/write");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      setSearchKeyword(keyword);
    }
  };

  useEffect(() => {
    setTotalPosts([]);
    getPosts(searchKeyword);
  }, [searchKeyword]);

  useEffect(() => {
    setPosts([]);
    getPostsByPage((page - 1) * postsPerPage, "community", searchKeyword);
  }, [page, searchKeyword]);

  return (
    <HomeAfterLoginLayout>
      <Head>
        <div>커뮤니티</div>
        <div>테니스에 대한 다양한 생각을 공유해보세요</div>
      </Head>
      <Settings>
        <WritingBtn onClick={onClickWritingBtn}>
          <HiPencil className="writingIcon" />
          작성하기
        </WritingBtn>
        <Search>
          <FiSearch className="searchIcon" />
          <input
            value={keyword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setKeyword(e.target.value);
            }}
            onKeyDown={handleKeyPress}
          />
        </Search>
        <BoardFilter
          filterType={filterType}
          setFilterType={setFilterType}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      </Settings>
      <Board>
        {posts.map((post: any) => (
          <Post post={post} isHome={false} />
        ))}
      </Board>
      <Pagination
        totalPage={Math.ceil(totalPosts.length / postsPerPage)}
        limit={5}
        page={page}
        setPage={setPage}
      />
    </HomeAfterLoginLayout>
  );
}

const Head = styled.div`
  background-color: #cde4a0;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 15px;
  & > div:last-child {
    font-size: 12px;
    color: grey;
    margin-top: 5px;
  }
`;

const Settings = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const Search = styled.div`
  position: relative;
  input {
    width: 350px;
    border: 2px solid #cde4a0;
    border-radius: 18px;
    padding: 9px 20px 9px 28px;
  }
  input:focus {
    outline: 2px solid #9bc940;
  }
  .searchIcon {
    position: absolute;
    top: 10px;
    left: 8px;
  }
`;

const WritingBtn = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 13px;
  border-radius: 10px;
  border: none;
  background-color: #9bc940;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  transition: background-color 300ms ease-in-out, color 300ms ease-in-out;
  &:hover {
    box-shadow: 100px 0 0 0 rgba(0, 0, 0, 0.1) inset;
    cursor: pointer;
  }
  .writingIcon {
    margin-right: 5px;
  }
`;

const Filter = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 7px 13px;
  border-radius: 10px;
  border: 1px solid #9bc940;
  font-size: 14px;
  &:hover {
    outline: 1px solid #9bc940;
  }
  .filterIcon {
    margin-right: 5px;
  }
`;

const Board = styled.div`
  margin-top: 20px;
`;
