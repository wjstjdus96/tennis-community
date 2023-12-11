import { useEffect, useState } from "react";
import { getTotalPosts, getTotalPostsByPage } from "../firebase/getData";
import { IUseGetPosts } from "../interfaces/IFunction";

export const useGetPosts = ({
  collectionName,
  page,
  searchKeyword,
  filterType,
  recruitType,
  marketCategory,
}: IUseGetPosts) => {
  const [totalPosts, setTotalPosts] = useState<any>([]);
  const [posts, setPosts] = useState<any>([]);
  const postsPerPage = 5;

  useEffect(() => {
    setTotalPosts([]);
    getTotalPosts({
      collectionName,
      keyword: searchKeyword,
      filterType,
      recruitType,
      marketCategory,
      setPosts: setTotalPosts,
    });
  }, [searchKeyword, filterType, recruitType, marketCategory]);

  useEffect(() => {
    setPosts([]);
    getTotalPostsByPage({
      offset: page - 1 + postsPerPage,
      collectionName,
      keyword: searchKeyword,
      filterType,
      recruitType,
      postsPerPage,
      setPosts,
    });
  }, [page, searchKeyword, filterType, recruitType, marketCategory]);

  return { posts, totalPosts };
};
