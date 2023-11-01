import styled from "styled-components";

interface IEditDeleteBtn {
  clickEditBtn?: () => void;
  clickDelelteBtn: () => void;
}

export function EditDeleteBtn({
  clickDelelteBtn,
  clickEditBtn,
}: IEditDeleteBtn) {
  return (
    <ButtonsWrapper>
      {clickEditBtn && (
        <Button usage="edit" onClick={clickEditBtn}>
          수정
        </Button>
      )}
      <Button usage="delete" onClick={clickDelelteBtn}>
        삭제
      </Button>
    </ButtonsWrapper>
  );
}

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
`;

const Button = styled.button<{ usage: string }>`
  border: none;
  padding: 4px 8px;
  border-radius: 10px;
  background-color: ${(props) => (props.usage == "edit" ? "lightgrey" : "red")};
  color: ${(props) => (props.usage == "edit" ? "black" : "white")};
  font-family: "Noto Sans KR", sans-serif;
  &:hover {
    cursor: pointer;
    box-shadow: 100px 0 0 0 rgba(0, 0, 0, 0.1) inset;
  }
`;
