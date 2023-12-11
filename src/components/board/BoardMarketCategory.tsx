import styled from "styled-components";
import { market_category_list } from "../../consts/const";
import { useEffect, useState } from "react";

interface IBoardMarketCategory {
  category: string[] | (string | null)[];
  setCategory: React.Dispatch<
    React.SetStateAction<string[] | (string | null)[]>
  >;
}

interface ICategoryListItem {
  icon: string;
  name: string;
  src: string;
}

export default function BoardMarketCategory({
  category,
  setCategory,
}: IBoardMarketCategory) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("");

  const handleClickCategory = () => {
    setIsExpanded((prev) => !prev);
  };

  const changeCategory = (category: ICategoryListItem) => {
    setCategory([category.name, category.src]);
    setIsExpanded(false);
  };

  useEffect(() => {
    const selected = market_category_list.find((e) => e.name === category[0]);
    setSelectedIcon(selected!.icon);
  }, [category]);

  return (
    <Wrapper>
      {isExpanded ? (
        <CategoryDropdown>
          {market_category_list.map((item: any, idx: number) => (
            <CategoryItem
              isSelected={false}
              key={idx}
              onClick={() => changeCategory(item)}
            >
              <img src={item.icon} />
              <div>{item.name}</div>
            </CategoryItem>
          ))}
        </CategoryDropdown>
      ) : (
        <CategoryItem isSelected={true} onClick={handleClickCategory}>
          <img src={selectedIcon} />
          <div>{category[0]}</div>
        </CategoryItem>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  position: relative;
  font-size: 14px;
`;

const CategoryDropdown = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CategoryItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  gap: 0.5rem;
  background-color: ${(props) =>
    props.isSelected ? props.theme.green[1] : props.theme.green[0]};
  padding: 10px 30px;
  border-radius: 30px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.green[1]};
  }
  img {
    width: 20px;
  }
`;
