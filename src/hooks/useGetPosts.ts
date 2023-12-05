import { useEffect, useState } from "react";
import { IPost } from "../interfaces/IValue";
import {
  getPosts,
  getPostsByPage,
  getRecruitPosts,
  getRecruitPostsByPage,
} from "../firebase/getData";

interface IUseGetPosts {
  collectionName: string;
  page: number;
  searchKeyword: string;
  filterType: any;
  recruitType?: any;
}

export const useGetPosts = ({
  collectionName,
  page,
  searchKeyword,
  filterType,
  recruitType,
}: IUseGetPosts) => {
  const [totalPosts, setTotalPosts] = useState<IPost[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const postsPerPage = 5;

  useEffect(() => {
    setTotalPosts([]);
    if (collectionName == "recruit") {
      getRecruitPosts({
        collectionName: collectionName,
        keyword: searchKeyword,
        filterType: filterType,
        recruitType: recruitType,
        setPosts: setTotalPosts,
      });
    }
    if (collectionName == "community") {
      getPosts({
        collectionName: collectionName,
        keyword: searchKeyword,
        filterType: filterType,
        setPosts: setTotalPosts,
      });
    }
  }, [searchKeyword, filterType, recruitType]);

  useEffect(() => {
    setPosts([]);
    if (collectionName == "recruit") {
      getRecruitPostsByPage({
        offset: (page - 1) * postsPerPage,
        collectionName: collectionName,
        keyword: searchKeyword,
        filterType: filterType,
        recruitType: recruitType,
        postsPerPage: postsPerPage,
        setPosts: setPosts,
      });
    }
    if (collectionName == "community") {
      getPostsByPage({
        offset: (page - 1) * postsPerPage,
        collectionName: collectionName,
        keyword: searchKeyword,
        filterType: filterType,
        postsPerPage: postsPerPage,
        setPosts: setPosts,
      });
    }
  }, [page, searchKeyword, filterType, recruitType]);

  return { posts, totalPosts };
};
