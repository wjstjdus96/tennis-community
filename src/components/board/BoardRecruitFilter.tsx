import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { recruit_filter_type_list } from "../../consts/const";
import { IBoardRecruitFilter } from "../../interfaces/IComponent";

export default function BoardRecruitFilter({
  recruitFilterType,
  setRecruitFilterType,
}: IBoardRecruitFilter) {
  const [searchParams, setSearchParams] = useSearchParams();

  const changeRecruitFilterType = (type: string[]) => {
    if (type[1] == null) {
      searchParams.delete("type");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ type: type[1] });
    }
    setRecruitFilterType(type);
  };
  return (
    <Wrapper>
      {recruit_filter_type_list.map((type: string[] | any) => (
        <FilterItem
          onClick={() => changeRecruitFilterType(type)}
          className={`${searchParams.get("type") === type[1] ? "select" : ""}`}
        >
          {type[0]}
        </FilterItem>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const FilterItem = styled.div`
  width: 50px;
  font-size: 12px;
  margin: 0;
  border: 2px solid ${(props) => props.theme.green[1]};
  background-color: ${(props) => props.theme.green[0]};
  color: ${(props) => props.theme.green[3]};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: baseline;
  padding: 3px;
  cursor: pointer;
  &.select {
    background-color: ${(props) => props.theme.green[1]};
    color: ${(props) => props.theme.green[3]};
    font-weight: 700;
  }
  &:hover {
    font-weight: 700;
  }
`;
