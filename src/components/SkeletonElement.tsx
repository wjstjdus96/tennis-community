import styled from "styled-components";

export default function SkeletonElement({ type }: { type: string }) {
  return <Wrapper className={type}></Wrapper>;
}

const Wrapper = styled.div`
  background: #ddd;
  border-radius: 4px;
  &.writer_profile {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  &.post_infos {
    width: 100%;
    height: 13px;
  }
  &.post_title {
    height: 18px;
    width: 100%;
  }
  &.market_post_image {
    width: 65px;
    height: 65px;
    border-radius: 10px;
  }
  &.market_post_price {
    width: 50%;
    height: 18px;
  }
  &.market_post_infos {
    align-self: flex-end;
    width: 30%;
    height: 18px;
  }
`;
