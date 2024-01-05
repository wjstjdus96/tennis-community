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
  }
  &.market_post_price {
  }
  &.market_post_infos {
  }
`;
