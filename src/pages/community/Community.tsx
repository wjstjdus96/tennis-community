import { useState } from "react";
import styled from "styled-components";
import BoardFilter from "../../components/board/BoardFilter";
import { BoardHead } from "../../components/board/BoardHead";
import { BoardSearch } from "../../components/board/BoardSearch";
import { BoardWritingBtn } from "../../components/board/BoardWritinBtn";
import { Pagination } from "../../components/board/Pagination";
import Post from "../../components/home/Post";
import { useGetPosts } from "../../hooks/useGetPosts";
import { HomeLayout } from "../../layouts/HomeLayout";

export default function Community() {
  const [page, setPage] = useState<number>(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterType, setFilterType] = useState(["최신순", "createdAt"]);
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
          setSearchKeyword={setSearchKeyword}
        />
        <BoardFilter filterType={filterType} setFilterType={setFilterType} />
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
