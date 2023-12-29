import { useState } from "react";
import styled from "styled-components";
import { BoardHead } from "../../components/board/BoardHead";
import BoardMarketCategory from "../../components/board/BoardMarketCategory";
import BoardSetting from "../../components/board/BoardSetting";
import { Pagination } from "../../components/board/Pagination";
import MarketPost from "../../components/home/MarketPost";
import { useGetPosts } from "../../hooks/useGetPosts";
import { IMarketPost } from "../../interfaces/IValue";
import { HomeLayout } from "../../layouts/HomeLayout";

export default function Market() {
  const [page, setPage] = useState<number>(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterType, setFilterType] = useState(["최신순", "createdAt"]);
  const [category, setCategory] = useState(["전체", null]);
  const postsPerPage = 10;
  const { posts, totalPosts } = useGetPosts({
    collectionName: "market",
    page,
    searchKeyword,
    filterType,
    marketCategory: category,
    postsPerPage,
    setPage,
  });

  return (
    <HomeLayout>
      <BoardHead title="플리마켓" summary="여러가지 테니스 용품을 나눠보세요" />
      <BoardSetting
        boardField="market"
        setSearchKeyword={setSearchKeyword}
        filterType={filterType}
        setFilterType={setFilterType}
      />
      <BoardMarketCategory category={category} setCategory={setCategory} />
      <Board>
        {posts.map((post: IMarketPost, idx: number) => (
          <MarketPost key={idx} post={post} />
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 20px;
`;
