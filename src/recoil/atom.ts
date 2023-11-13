import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

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

const { persistAtom } = recoilPersist({
  key: "persist",
  storage: sessionStorage,
});

export const userState = atom<IUserState>({
  key: "userState",
  default: { email: "", displayName: "", photo: "", id: "" },
  effects_UNSTABLE: [persistAtom],
});

export const userBookmarkState = atom<IUserBookmarkState>({
  key: "userBookmark",
  default: { community: [], recruit: [], market: [] },
  effects_UNSTABLE: [persistAtom],
});
