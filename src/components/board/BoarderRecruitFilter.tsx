import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

interface IBoardRecruitFilter {
  recruitFilterType: string[];
  setRecruitFilterType: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function BoardRecruitFilter({
  recruitFilterType,
  setRecruitFilterType,
}: IBoardRecruitFilter) {
  const [serchParams, setSearchParams] = useSearchParams();
  console.log(serchParams.get("type"));
  const recruitFilterTypeList = [
    ["전체", "total"],
    ["게스트", "guest"],
    ["회원", "member"],
    ["기타", "others"],
  ];
  const changeRecruitFilterType = (type: string[]) => {
    setRecruitFilterType(type);
    setSearchParams({ type: type[1] });
  };
  return (
    <Wrapper>
      {recruitFilterTypeList.map((type: string[]) => (
        <div onClick={() => changeRecruitFilterType(type)}>{type[0]}</div>
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
  & > div {
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
  }
`;
