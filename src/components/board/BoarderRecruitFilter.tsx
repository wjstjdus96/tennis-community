import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { IBoardRecruitFilter } from "../../interfaces/IComponent";
import { recruit_filter_type_list } from "../../consts/const";

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
  border: 1px solid ${(props) => props.theme.green[2]};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: baseline;
  padding: 3px;
  cursor: pointer;
  &.select {
    background-color: ${(props) => props.theme.green[2]};
    color: white;
  }
`;