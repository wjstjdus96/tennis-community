import styled from "styled-components";
import SkeletonElement from "../SkeletonElement";

export default function PostSkeleton({
  field,
  isHome,
}: {
  field: string;
  isHome: boolean;
}) {
  return (
    <Wrapper isHome={isHome} field={field}>
      <Infos>
        <SkeletonElement type="writer_profile" />
        <SkeletonElement type="post_infos" />
      </Infos>
      <SkeletonElement type="post_title" />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ isHome: boolean; field: string }>`
  padding: ${(props) =>
    props.isHome
      ? props.field == "community"
        ? "1.03rem 1rem "
        : "1rem"
      : "15px 3px"};
  border-bottom: 1px solid ${(props) => props.theme.green[1]};
  max-width: 100%;
`;

const Infos = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`;
