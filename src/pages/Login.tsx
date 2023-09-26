import styled from "styled-components";
import { BiSolidTennisBall } from "react-icons/bi";
import { Link } from "react-router-dom";
import AuthInput from "../components/AuthInput";
import HomeLayout from "../layouts/HomeLayout";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

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

  const onSubmitHandler: SubmitHandler<ILoginValue> = async (data) => {};

  return (
    <HomeLayout>
      <Logo>
        TENNING
        <BiSolidTennisBall />
      </Logo>
      <Box>
        <Title>로그인</Title>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <AuthInput
            name="email"
            text="이메일"
            inputType="email"
            register={register}
            errorMsg={errors.email && "이메일을 입력해주세요"}
          />
          <AuthInput
            name="password"
            text="비밀번호"
            inputType="password"
            register={register}
            errorMsg={errors.password && "비밀번호를 입력해주세요"}
          />
          <SubmitBtn type="submit">로그인</SubmitBtn>
        </form>
        <hr />
        <Others>
          <div>아직 회원이 아니신가요?</div>
          <Link to="/signup">회원가입</Link>
        </Others>
      </Box>
    </HomeLayout>
  );
}

const Logo = styled.div`
  display: flex;
  justify-content: center;
  font-size: 50px;
  font-family: "Allan", cursive;
  margin-bottom: 20px;
  letter-spacing: 20px;
  svg {
    color: #9bc940;
  }
`;

const Box = styled.div`
  position: relative;
  width: 400px;
  min-height: 400px;
  border-radius: 30px;
  padding: 30px 70px;
  background-color: rgb(255, 255, 255, 0.5);
  font-family: "Do Hyeon", sans-serif;
`;

const Title = styled.div`
  font-size: 30px;
  text-align: center;
  margin-bottom: 10px;
`;

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

const Others = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  div {
    margin-right: 10px;
  }
  a {
    text-underline-offset: 2px;
  }
`;
