import styled from "styled-components";
import SkeletonElement from "../SkeletonElement";

export default function MaketPostSkeleton({ isHome }: { isHome: boolean }) {
  return (
    <Wrapper isHome={isHome}>
      <SkeletonElement type="market_post_image" />
      <PostWrapper>
        <SkeletonElement type="post_title" />
        <SkeletonElement type="market_post_price" />
        <SkeletonElement type="market_post_infos" />
      </PostWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ isHome?: boolean }>`
  border-bottom: 1px solid ${(props) => props.theme.green[1]};
  padding: ${(props) => (props.isHome ? "15px" : "15px 0")};
  display: grid;
  grid-template-columns: 1fr 8fr;
  gap: 15px;
`;

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
