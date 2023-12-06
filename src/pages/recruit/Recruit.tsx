import { useState } from "react";
import styled from "styled-components";
import BoardFilter from "../../components/board/BoardFilter";
import { BoardHead } from "../../components/board/BoardHead";
import { BoardSearch } from "../../components/board/BoardSearch";
import { BoardWritingBtn } from "../../components/board/BoardWritinBtn";
import BoardRecruitFilter from "../../components/board/BoarderRecruitFilter";
import { Pagination } from "../../components/board/Pagination";
import Post from "../../components/home/Post";
import { useGetPosts } from "../../hooks/useGetPosts";
import { HomeLayout } from "../../layouts/HomeLayout";

export default function Recruit() {
  const [page, setPage] = useState<number>(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterType, setFilterType] = useState(["최신순", "createdAt"]);
  const [recruitType, setRecruitType] = useState(["전체", null]);
  const postsPerPage = 5;
  const { posts, totalPosts } = useGetPosts({
    collectionName: "recruit",
    page,
    searchKeyword,
    filterType,
    recruitType,
  });

  return (
    <HomeLayout>
      <BoardHead
        title="사람모집"
        summary="다양한 사람들과 함께 테니스를 즐겨보세요"
      />
      <Settings>
        <BoardWritingBtn boardField="recruit" />
        <BoardSearch boardField="recruit" setSearchKeyword={setSearchKeyword} />
        <BoardFilter filterType={filterType} setFilterType={setFilterType} />
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
