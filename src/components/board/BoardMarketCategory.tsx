import styled, { keyframes } from "styled-components";
import { market_category_list } from "../../consts/const";
import { useEffect, useState } from "react";
import { useDropDown } from "../../hooks/useDropdown";
import { useCheckIsMobile } from "../../hooks/useCheckIsMobile";

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
  const { isMobile } = useCheckIsMobile();
  const {
    isExpanded,
    isExpandedVisibility,
    setIsExpanded,
    toggleDropdown,
    clickOutside,
  } = useDropDown();

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
        <CategoryDropdown isExpanded={isExpanded}>
          {market_category_list.map((item: any, idx: number) => (
            <CategoryItem
              isSelected={item.name == category[0]}
              key={idx}
              onClick={() => changeCategory(item)}
            >
              <img src={item.icon} />
              {!isMobile && <div>{item.name}</div>}
            </CategoryItem>
          ))}
        </CategoryDropdown>
      ) : (
        <SelectedCategoryItem onClick={toggleDropdown}>
          <img src={selectedIcon} />
          <div>{category[0]}</div>
        </SelectedCategoryItem>
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
  margin-top: 20px;
`;

const expandedAnimation = (isExpanded: boolean) => keyframes`
  0% {
    transform: scaleX(${isExpanded ? 0 : 1})
  }

  100% {
    transform: scaleX(${isExpanded ? 1 : 0});
  }
`;

const CategoryDropdown = styled.div<{ isExpanded: boolean }>`
  display: flex;
  gap: 0.5rem;
  animation: ${(props) => expandedAnimation(props.isExpanded)} 0.2s ease;
`;

const CategoryItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  font-size: 13px;
  background-color: ${(props) =>
    props.isSelected ? props.theme.green[1] : props.theme.green[0]};

  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.green[1]};
  }
  img {
    width: 15px;
    height: 15px;
  }

  @media all and (min-width: 360px) and (max-width: 767px) {
    border-radius: 50%;
    padding: 11px;
  }

  @media all and (min-width: 768px) and (max-width: 1200px) {
    border-radius: 40px;
    padding: 9px 20px;
  }

  @media all and (min-width: 1201px) {
    border-radius: 40px;
    padding: 9px 30px;
  }
`;

const SelectedCategoryItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 9px 30px;
  font-size: 13px;
  background-color: ${(props) => props.theme.green[1]};
  border-radius: 40px;
  cursor: pointer;
  img {
    width: 15px;
    height: 15px;
  }
`;
