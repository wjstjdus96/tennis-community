import styled from "styled-components";
import { market_category_list } from "../../consts/const";
import { useState } from "react";

interface IBoardMarketCategory {
  category: string[] | (string | null)[];
  setCategory: React.Dispatch<
    React.SetStateAction<string[] | (string | null)[]>
  >;
}

export default function BoardMarketCategory({
  category,
  setCategory,
}: IBoardMarketCategory) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClickCategory = () => {
    setIsExpanded((prev) => !prev);
  };

  const changeCategory = (category: string[]) => {
    setCategory(category);
    setIsExpanded(false);
  };

  return (
    <Wrapper>
      <SelectedCategoryBox onClick={handleClickCategory}>
        {market_category_list[1].name}
      </SelectedCategoryBox>
      {isExpanded && (
        <CategoryDropdown>
          {market_category_list.map((item: any, idx: number) => (
            <CategoryDropdownItem onClick={() => changeCategory(item)}>
              {item.name}
            </CategoryDropdownItem>
          ))}
        </CategoryDropdown>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 1.2rem;
`;

const SelectedCategoryBox = styled.div``;

const CategoryDropdown = styled.div``;

const CategoryDropdownItem = styled.div``;

const CategoryItemBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.green[0]};
    padding: 12px;
    border-radius: 50%;
  }
  & > div:last-child {
    font-size: 12px;
  }
  img {
    width: 1.8rem;
    height: 1.8rem;
  }
`;
