import styled from "styled-components";
import { BoardHead } from "../../components/board/BoardHead";
import { HomeLayout } from "../../layouts/HomeLayout";
import { useGetPosts } from "../../hooks/useGetPosts";
import { useState } from "react";
import { BoardWritingBtn } from "../../components/board/BoardWritinBtn";
import { BoardSearch } from "../../components/board/BoardSearch";
import BoardFilter from "../../components/board/BoardFilter";
import BoardMarketCategory from "../../components/board/BoardMarketCategory";
import MarketPost from "../../components/home/MarketPost";
import { IMarketPost } from "../../interfaces/IValue";

export default function Market() {
  const [page, setPage] = useState<number>(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterType, setFilterType] = useState(["최신순", "createdAt"]);
  const [category, setCategory] = useState(["전체", null]);
  const { posts, totalPosts } = useGetPosts({
    collectionName: "market",
    page,
    searchKeyword,
    filterType,
    recruitType: category,
  });

  return (
    <HomeLayout>
      <BoardHead title="플리마켓" summary="여러가지 테니스 용품을 나눠보세요" />
      <Settings>
        <BoardWritingBtn boardField="market" />
        <BoardSearch boardField="market" setSearchKeyword={setSearchKeyword} />
        <BoardFilter filterType={filterType} setFilterType={setFilterType} />
      </Settings>
      <BoardMarketCategory category={category} setCategory={setCategory} />
      <Board>
        {posts.map((post: IMarketPost, idx: number) => (
          <MarketPost key={idx} post={post} />
        ))}
      </Board>
    </HomeLayout>
  );
}

const Settings = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 20px;
`;
