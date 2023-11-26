import styled from "styled-components";
import { BoardHead } from "../../components/board/BoardHead";
import { HomeLayout } from "../../layouts/HomeLayout";
import { BoardWritingBtn } from "../../components/board/BoardWritinBtn";
import { useEffect, useState } from "react";
import { BoardSearch } from "../../components/board/BoardSearch";
import BoardFilter from "../../components/board/BoardFilter";
import { IPost } from "../../interfaces/IValue";
import { Pagination } from "../../components/board/Pagination";
import Post from "../../components/home/Post";
import {
  getPosts,
  getPostsByPage,
  getRecruitPosts,
  getRecruitPostsByPage,
} from "../../firebase/getData";
import BoardRecruitFilter from "../../components/board/BoarderRecruitFilter";

export default function Recruit() {
  const [totalPosts, setTotalPosts] = useState<IPost[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState<number>(1);
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterType, setFilterType] = useState(["최신순", "createdAt"]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [recruitType, setRecruitType] = useState(["전체", "total"]);
  const postsPerPage = 5;

  useEffect(() => {
    setTotalPosts([]);
    getRecruitPosts({
      collectionName: "recruit",
      keyword: searchKeyword,
      filterType: filterType,
      recruitType: recruitType,
      setPosts: setTotalPosts,
    });
  }, [searchKeyword, filterType, recruitType]);

  useEffect(() => {
    setPosts([]);
    getRecruitPostsByPage({
      offset: (page - 1) * postsPerPage,
      collectionName: "recruit",
      keyword: searchKeyword,
      filterType: filterType,
      recruitType: recruitType,
      postsPerPage: postsPerPage,
      setPosts: setPosts,
    });
  }, [page, searchKeyword, filterType, recruitType]);

  return (
    <HomeLayout>
      <BoardHead
        title="사람모집"
        summary="다양한 사람들과 함께 테니스를 즐겨보세요"
      />
      <Settings>
        <BoardWritingBtn boardField="recruit" />
        <BoardSearch
          keyword={keyword}
          setKeyword={setKeyword}
          setSearchKeyword={setSearchKeyword}
        />
        <BoardFilter
          filterType={filterType}
          setFilterType={setFilterType}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      </Settings>
      <BoardRecruitFilter
        recruitFilterType={recruitType}
        setRecruitFilterType={setRecruitType}
      />
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
    </HomeLayout>
  );
}

const Settings = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;
const Board = styled.div`
  margin-top: 20px;
`;
