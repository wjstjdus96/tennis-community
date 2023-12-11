import { useState } from "react";
import BoardMarketCategory from "../board/BoardMarketCategory";
import styled from "styled-components";
import { market_category_list } from "../../consts/const";

export default function SelectMarketCategory() {
  return (
    <Wrapper>
      <label htmlFor="category">카테고리</label>
      <CategoryList>
        {market_category_list.slice(1).map((item: any, idx: number) => (
          <CategoryItem isSelected={false}>
            <img src={item.icon} />
            <div>{item.name}</div>
          </CategoryItem>
        ))}
      </CategoryList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 15px;
  label {
    color: grey;
    font-size: 15px;
    margin-bottom: 15px;
  }
`;

const CategoryList = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CategoryItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: ${(props) =>
    props.isSelected ? props.theme.green[1] : props.theme.green[0]};
  padding: 9px 30px;
  border-radius: 40px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.green[1]};
  }
  img {
    width: 15px;
    height: 15px;
  }
`;
