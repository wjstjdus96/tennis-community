import iconAll from "../assets/market_category/icon-all.png";
import iconBag from "../assets/market_category/icon-bag.png";
import iconRacket from "../assets/market_category/icon-racket.png";
import iconShoes from "../assets/market_category/icon-sport-shoes.png";
import iconClothes from "../assets/market_category/icon-sportswear.png";
import iconEtc from "../assets/market_category/icon-tennis-balls.png";

export const market_category_list = [
  {
    icon: iconAll,
    name: "전체",
    src: "",
  },
  {
    icon: iconBag,
    name: "가방",
    src: "bag",
  },
  {
    icon: iconRacket,
    name: "라켓",
    src: "racket",
  },
  {
    icon: iconShoes,
    name: "신발",
    src: "shoes",
  },
  {
    icon: iconClothes,
    name: "옷",
    src: "clothes",
  },
  {
    icon: iconEtc,
    name: "기타",
    src: "etc",
  },
];

export const board_filter_type_list = [
  ["최신순", "createdAt"],
  ["북마크순", "bookmarkNum"],
  ["댓글순", "commentNum"],
];

export const header_menu_list = [
  { name: "커뮤니티", src: "/community" },
  { name: "사람모집", src: "/recruit" },
  { name: "플리마켓", src: "/market" },
];

export const mypage_activities_field_list = [
  { kor: "커뮤니티", eng: "community" },
  { kor: "사람모집", eng: "recruit" },
  { kor: "플리마켓", eng: "market" },
];

export const recruit_filter_type_list = [
  ["전체", null],
  ["게스트", "guest"],
  ["회원", "member"],
  ["기타", "others"],
];
