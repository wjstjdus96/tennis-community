import { HomeAfterLoginLayout } from "../layouts/HomeLayout";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { HiOutlineSortDescending, HiPencil } from "react-icons/hi";

export default function Community() {
  return (
    <HomeAfterLoginLayout>
      <Head>
        <div>커뮤니티</div>
        <div>테니스에 대한 다양한 생각을 공유해보세요</div>
      </Head>
      <Settings>
        <WritingBtn>
          <HiPencil className="writingIcon" />
          작성하기
        </WritingBtn>
        <Search>
          <FiSearch className="searchIcon" />
          <input />
        </Search>
        <Filter>
          <HiOutlineSortDescending className="filterIcon" size="18" />
          <div>최신순</div>
        </Filter>
      </Settings>
      <Board></Board>
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
