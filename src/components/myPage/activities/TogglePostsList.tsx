import styled from "styled-components";
import { mypage_activities_field_list } from "../../../consts/const";
import { ITogglePostsList } from "../../../interfaces/IComponent";
import { IField, IFieldItemIds } from "../../../interfaces/IValue";
import TogglePostsItem from "./TogglePostsItem";

export default function TogglePostsList({ fieldPostsIds }: ITogglePostsList) {
  return (
    <Wrapper>
      {mypage_activities_field_list.map((field: IField) => (
        <TogglePostsItem
          postsIds={fieldPostsIds[field.eng as keyof IFieldItemIds]}
          fieldEng={field.eng}
          fieldKor={field.kor}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 15px;
`;
