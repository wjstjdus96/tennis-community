import styled from "styled-components";
import { market_category_list } from "../../consts/const";

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
  return (
    <Wrapper>
      {market_category_list.map((item, idx) => (
        <CategoryItemBox>
          <div>
            <img src={item.icon} />
          </div>
        </CategoryItemBox>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 1.2rem;
`;

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
