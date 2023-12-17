import styled from "styled-components";
import { market_category_list } from "../../consts/const";
import { useEffect, useState } from "react";
import { useDropDown } from "../../hooks/useDropdown";

interface IBoardMarketCategory {
  category: string[] | (string | null)[];
  setCategory: React.Dispatch<
    React.SetStateAction<string[] | (string | null)[]>
  >;
}

export interface ICategoryListItem {
  icon: string;
  name: string;
  src: string;
}

export default function BoardMarketCategory({
  category,
  setCategory,
}: IBoardMarketCategory) {
  const { isExpanded, setIsExpanded, toggleDropdown, clickOutside } =
    useDropDown();

  const [selectedIcon, setSelectedIcon] = useState("");

  const changeCategory = (category: ICategoryListItem) => {
    if (category.name == "전체") {
      setCategory([category.name, null]);
    } else {
      setCategory([category.name, category.src]);
    }
    setIsExpanded(false);
  };

  useEffect(() => {
    const selected = market_category_list.find((e) => e.name === category[0]);
    setSelectedIcon(selected!.icon);
  }, [category]);

  return (
    <Wrapper onBlur={clickOutside} tabIndex={0}>
      {isExpanded ? (
        <CategoryDropdown>
          {market_category_list.map((item: any, idx: number) => (
            <CategoryItem
              isSelected={item.name == category[0]}
              key={idx}
              onClick={() => changeCategory(item)}
            >
              <img src={item.icon} />
              <div>{item.name}</div>
            </CategoryItem>
          ))}
        </CategoryDropdown>
      ) : (
        <CategoryItem isSelected={true} onClick={toggleDropdown}>
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
