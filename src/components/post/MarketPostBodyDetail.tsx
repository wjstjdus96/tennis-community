import styled from "styled-components";
import { IPostBody } from "../../interfaces/IComponent";

export default function MarketPostBodyDetail({ postData }: IPostBody) {
  return (
    <Wrapper>
      <DetailRowBox>
        <div>카테고리</div>
        <div>{postData.category!}</div>
      </DetailRowBox>
      <DetailRowBox>
        <div>가격</div>
        <div>{postData.price!.toLocaleString()} 원</div>
      </DetailRowBox>
      <DetailRowBox>
        <div>거래방식</div>
        <div>{postData.transactionMethod!}</div>
      </DetailRowBox>
      <DetailRowBox>
        <div>제품설명</div>
        <div>{postData.body!}</div>
      </DetailRowBox>
      <DetailColumnBox>
        <div>제품사진</div>
        {postData.images!.map((url) => (
          <img src={url} />
        ))}
      </DetailColumnBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const DetailRowBox = styled.div`
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 80px auto;
  & > div:first-child {
    font-weight: 700;
    color: gray;
  }
`;

const DetailColumnBox = styled.div`
  margin-bottom: 20px;
  & > div:first-child {
    font-weight: 700;
    margin-bottom: 20px;
    color: gray;
  }
`;
