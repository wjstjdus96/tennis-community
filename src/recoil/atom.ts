import { atom } from "recoil";

interface IUserState {
  email: string;
  displayName: string;
  photo: string;
  id: string;
}

export interface IUserBookmarkState {
  community: string[];
  recruit: string[];
  market: string[];
}

export const userState = atom<IUserState>({
  key: "userState",
  default: { email: "", displayName: "", photo: "", id: "" },
});

export const userBookmarkState = atom<IUserBookmarkState>({
  key: "userActivity",
  default: { community: [], recruit: [], market: [] },
});
