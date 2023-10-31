import styled from "styled-components";
import { HiPencil } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export function BoardWritingBtn({ boardField }: { boardField: string }) {
  const navigate = useNavigate();
  const onClickWritingBtn = () => {
    navigate("write", { state: boardField });
  };

  return (
    <WritingBtn onClick={onClickWritingBtn}>
      <HiPencil className="writingIcon" />
      작성하기
    </WritingBtn>
  );
}

const WritingBtn = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 13px;
  border-radius: 10px;
  border: none;
  background-color: #9bc940;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  transition: background-color 300ms ease-in-out, color 300ms ease-in-out;
  &:hover {
    box-shadow: 100px 0 0 0 rgba(0, 0, 0, 0.1) inset;
    cursor: pointer;
  }
  .writingIcon {
    margin-right: 5px;
  }
`;
