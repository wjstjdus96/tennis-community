import { useEffect, useState } from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
import clicking from "../../assets/icon-clicking.png";
import { market_category_list } from "../../consts/const";
import { useCheckIsMobile } from "../../hooks/useCheckIsMobile";
import { ISelectMarketCategory } from "../../interfaces/IComponent";
import { ICategoryListItem } from "../board/BoardMarketCategory";
import ErrorMsg from "./ErrorMsg";

export default function SelectMarketCategory({
  name,
  text,
  control,
  existing,
  errorMsg,
}: ISelectMarketCategory) {
  const { isMobile } = useCheckIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    icon: clicking,
    name: "선택",
    src: "",
  });

  const {
    field: { value, onChange },
  } = useController({
    name: name,
    control: control,
  });

  const onClickCategory = (category: ICategoryListItem) => {
    setSelectedCategory(category);
    onChange(category.name);
    setIsExpanded(false);
  };

  useEffect(() => {
    if (existing) {
      const selected = market_category_list.find((e) => e.name === existing);
      setSelectedCategory(selected!);
    }
  }, []);

  return (
    <Wrapper>
      <label htmlFor={name}>{text}</label>
      <CategoryItem
        isSelectedMain={true}
        isSelected={true}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <img src={selectedCategory.icon} />
        {!isMobile && <div>{selectedCategory.name}</div>}
      </CategoryItem>
      {isExpanded && (
        <CategoryList>
          {market_category_list
            .slice(1)
            .map((item: ICategoryListItem, idx: number) => (
              <CategoryItem
                key={idx}
                isSelected={item.name == value}
                onClick={() => onClickCategory(item)}
              >
                <img src={item.icon} />
                <div>{item.name}</div>
              </CategoryItem>
            ))}
        </CategoryList>
      )}
      {errorMsg && <ErrorMsg errorMsg={errorMsg} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 15px;
  position: relative;
  label {
    color: grey;
    font-size: 15px;
    margin-bottom: 15px;
  }
`;

const CategoryList = styled.div`
  position: absolute;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
  top: 90px;
  background-color: ${(props) => props.theme.green[0]};
  padding: 20px 10px;
  border-radius: 15px;
`;

const CategoryItem = styled.div<{
  isSelected: boolean;
  isSelectedMain?: boolean;
}>`
  width: ${(props) => (props.isSelectedMain ? "90%" : "110px")};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;
  background-color: ${(props) =>
    props.isSelected ? props.theme.green[1] : props.theme.green[0]};
  padding: 13px 10px;
  border-radius: 40px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: ${(props) => props.theme.green[1]};
  }
  img {
    width: 15px;
    height: 15px;
  }

  @media all and (min-width: 360px) and (max-width: 767px) {
    padding: 13px 5px;
  }
`;
