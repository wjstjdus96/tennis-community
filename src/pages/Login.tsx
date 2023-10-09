import styled from "styled-components";
import AuthInput from "../components/AuthInput";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "@firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

export interface ILoginValue {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginValue>();
  const navigate = useNavigate();

  const onSubmitHandler: SubmitHandler<ILoginValue> = async (data) => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (error) {
      alert("로그인에 실패하였습니다. 다시 시도해주세요");
      reset();
    }
  };

  return (
    <AuthLayout title="로그인">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <AuthInput
          name="email"
          text="이메일을 입력하십시오"
          inputType="email"
          register={register}
          errorMsg={errors.email && "이메일을 입력해주세요"}
        />
        <AuthInput
          name="password"
          text="비밀번호를 입력하십시오"
          inputType="password"
          register={register}
          errorMsg={errors.password && "비밀번호를 입력해주세요"}
        />
        <SubmitBtn type="submit">로그인</SubmitBtn>
      </form>
    </AuthLayout>
  );
}

const SubmitBtn = styled.button`
  width: 100%;
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
