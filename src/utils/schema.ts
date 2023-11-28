import * as yup from "yup";

export const signupSchema = yup.object({
  email: yup
    .string()
    .required("이메일을 입력해주세요")
    .email("이메일 형식이 아닙니다"),
  password: yup
    .string()
    .required("영문, 숫자포함 8자리를 입력해주세요.")
    .min(8, "최소 8자 이상 가능합니다")
    .max(15, "최대 15자 까지만 가능합니다")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
      "영문 숫자포함 8자리를 입력해주세요."
    ),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 다릅니다."),
  nickname: yup
    .string()
    .required("닉네임을 입력해주세요")
    .max(6, "최대 6자 까지만 가능합니다"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("이메일을 입력해주세요")
    .email("이메일 형식이 아닙니다"),
  password: yup.string().required("비밀번호를 입력해주세요"),
});

export const communityWritingSchema = yup.object({
  title: yup.string().required("제목을 입력해주세요"),
  body: yup.string().required("내용을 입력해주세요"),
});

export const recruitWritingSchema = yup.object({
  type: yup
    .string()
    .required("모집 형식을 선택해주세요")
    .oneOf(["회원", "게스트", "기타"]),
  title: yup.string().required("제목을 입력해주세요"),
  body: yup.string().required("내용을 입력해주세요"),
});
