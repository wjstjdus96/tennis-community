import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { IPagination } from "../../interfaces/IComponent";

export function Pagination({ totalPage, limit, page, setPage }: IPagination) {
  const [currentPageArray, setCurrentPageArray] = useState<any>([]);
  const [totalPageArray, setTotalPageArray] = useState<any>([]);
  const sliceArrayByLimit = (totalPage: number, limit: number) => {
    const totalPageArray = Array(totalPage)
      .fill(0)
      .map((_, i) => i);
    return Array(Math.ceil(totalPage / limit))
      .fill(0)
      .map(() => totalPageArray.splice(0, limit));
  };

  useEffect(() => {
    if (page % limit === 1) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit)]);
    } else if (page % limit === 0) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit) - 1]);
    }
  }, [page]);

  useEffect(() => {
    const slicedPageArray = sliceArrayByLimit(totalPage, limit);
    setTotalPageArray(slicedPageArray);
    setCurrentPageArray(slicedPageArray[0]);
  }, [totalPage]);

  return (
    <Wrapper>
      <FaAngleDoubleLeft onClick={() => setPage(1)} className="icon" />
      <FaAngleLeft
        onClick={() => {
          if (page !== 1) setPage(page - 1);
        }}
        className="icon"
      />
      <ButtonWrapper>
        {currentPageArray?.map((i: any) => (
          <PageButton
            key={i + 1}
            onClick={() => setPage(i + 1)}
            isActive={page === i + 1 ? true : false}
          >
            {i + 1}
          </PageButton>
        ))}
      </ButtonWrapper>
      <FaAngleRight
        onClick={() => {
          if (page !== totalPage) setPage(page + 1);
        }}
        className="icon"
      />
      <FaAngleDoubleRight onClick={() => setPage(totalPage)} className="icon" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 30px 0px;
  .icon {
    color: ${(props) => props.theme.green[2]};
    cursor: pointer;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const PageButton = styled.div<{ isActive: boolean }>`
  font-size: 13px;
  font-weight: 700;
  color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10px;
  height: 10px;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? "#cde4a0" : "none")};
`;
