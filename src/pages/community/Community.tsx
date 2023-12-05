import { HomeLayout } from "../../layouts/HomeLayout";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Post from "../../components/home/Post";
import { Pagination } from "../../components/board/Pagination";
import BoardFilter from "../../components/board/BoardFilter";
import { IPost } from "../../interfaces/IValue";
import { BoardHead } from "../../components/board/BoardHead";
import { BoardWritingBtn } from "../../components/board/BoardWritinBtn";
import { BoardSearch } from "../../components/board/BoardSearch";
import { getPosts, getPostsByPage } from "../../firebase/getData";
import { useGetPosts } from "../../hooks/useGetPosts";

export default function Community() {
  const [page, setPage] = useState<number>(1);
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterType, setFilterType] = useState(["최신순", "createdAt"]);
  const [isExpanded, setIsExpanded] = useState(false);
  const postsPerPage = 5;
  const { posts, totalPosts } = useGetPosts({
    collectionName: "community",
    page,
    searchKeyword,
    filterType,
  });

  return (
    <HomeLayout>
      <BoardHead
        title="커뮤니티"
        summary="테니스에 대한 다양한 생각을 공유해보세요"
      />
      <Settings>
        <BoardWritingBtn boardField="community" />
        <BoardSearch
          boardField="community"
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
