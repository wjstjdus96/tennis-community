import { useState } from "react";
import BoardMarketCategory, {
  ICategoryListItem,
} from "../board/BoardMarketCategory";
import styled from "styled-components";
import { market_category_list } from "../../consts/const";
import { ISelectMarketCategory } from "../../interfaces/IComponent";
import { useController } from "react-hook-form";
import clicking from "../../assets/icon-clicking.png";

export default function SelectMarketCategory({
  name,
  text,
  control,
  errorMsg,
}: ISelectMarketCategory) {
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

  return (
    <Wrapper>
      <label htmlFor={name}>{text}</label>
      <CategoryItem
        isSelected={true}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <img src={selectedCategory.icon} />
        <div>{selectedCategory.name}</div>
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
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

const CategoryItem = styled.div<{ isSelected: boolean }>`
  min-width: 70px;
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
