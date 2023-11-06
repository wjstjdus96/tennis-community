import { IComment, IPost } from "./IValue";

export interface IGetPost {
  collectionName: string;
  docId: string;
  setPostData: React.Dispatch<any>;
}

export interface IGetPosts {
  collectionName: string;
  keyword: string;
  filterType: string[];
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

export interface IGetPostsByPage {
  offset: number;
  collectionName: string;
  keyword: string;
  filterType: string[];
  postsPerPage: number;
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

export interface IGetComments {
  collectionName: string;
  docId: string;
  setComments: React.Dispatch<React.SetStateAction<any>>;
}

export interface IGetImage {
  imageURL: string;
  setImage?: React.Dispatch<React.SetStateAction<string>>;
}

export interface RouteState {
  state: IPost;
}

export interface ISetComment {
  comment: string;
}
