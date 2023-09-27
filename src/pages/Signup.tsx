import AuthInput from "../components/AuthInput";
import AuthLayout from "../layouts/AuthLayout";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface ISignupValue {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

export default function Signup() {
  const formSchema = yup.object({
    email: yup
      .string()
      .required("이메일을 입력해주세요")
      .email("이메일 형식이 아닙니다"),
    nickname: yup.string().required("닉네임을 입력해주세요"),
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
      .required("비밀번호를 한번 더 입력해주세요")
      .oneOf([yup.ref("password")], "비밀번호가 다릅니다."),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignupValue>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onSubmitHandler: SubmitHandler<ISignupValue> = async (data) =>
    console.log(data);

  return (
    <AuthLayout title="회원가입">
      <Form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormInputs>
          <AuthInput
            name="email"
            text="이메일을 입력하십시오"
            inputType="email"
            register={register}
            errorMsg={errors.email && errors.email.message}
          />
          <AuthInput
            name="nickname"
            text="닉네임을 입력하십시오"
            register={register}
            errorMsg={errors.nickname && errors.nickname.message}
          />
          <AuthInput
            name="password"
            text="비밀번호를 입력하십시오"
            inputType="password"
            register={register}
            errorMsg={errors.password && errors.password.message}
          />
          <AuthInput
            name="passwordConfirm"
            inputType="password"
            register={register}
            errorMsg={errors.passwordConfirm && errors.passwordConfirm.message}
          />
        </FormInputs>
        <SubmitBtn type="submit">회원가입</SubmitBtn>
      </Form>
    </AuthLayout>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubmitBtn = styled.button`
  width: 400px;
  margin: 20px 0px 30px 0px;
  box-sizing: border-box;
  appearance: none;
  background-color: #9bc940;
  padding: 0.8em 2em;
  border-radius: 20px;
  text-decoration: none;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  border: 2px solid #9bc940;
  transition: background-color 300ms ease-in-out, color 300ms ease-in-out;
  &:hover {
    background-color: transparent;
  }
`;

const FormInputs = styled.div`
  display: grid;
  width: max-content;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
  input {
    width: 300px;
  }
`;
