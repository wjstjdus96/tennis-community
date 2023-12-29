import { useState } from "react";
import styled from "styled-components";
import { BoardHead } from "../../components/board/BoardHead";
import BoardSetting from "../../components/board/BoardSetting";
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
    postsPerPage,
    setPage,
  });

  return (
    <HomeLayout>
      <BoardHead
        title="커뮤니티"
        summary="테니스에 대한 다양한 생각을 공유해보세요"
      />
      <BoardSetting
        boardField="community"
        setSearchKeyword={setSearchKeyword}
        filterType={filterType}
        setFilterType={setFilterType}
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

const Board = styled.div`
  margin-top: 20px;
`;
