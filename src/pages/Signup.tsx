import AuthInput from "../components/AuthInput";
import AuthLayout from "../layouts/AuthLayout";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";

interface ISignup {
  email: string;
  nickname?: string;
  password: string;
  checkPw?: string;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignup>();

  return (
    <AuthLayout title="회원가입">
      <Form>
        <FormInputs>
          <AuthInput
            name="email"
            text="이메일을 입력하십시오"
            inputType="email"
            register={register}
          />
          <AuthInput
            name="nickname"
            text="닉네임을 입력하십시오"
            register={register}
          />
          <AuthInput
            name="password"
            text="비밀번호를 입력하십시오"
            register={register}
          />
          <AuthInput name="checkPw" text="" register={register} />
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
