import { motion } from 'framer-motion';
import styled from 'styled-components';
import { TextField, Button, Typography } from '@mui/material';
import { PATH_URL } from '../shared/constants';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { user } from '../api/axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const MotionContainer = motion('div');

const Login = () => {
  const [userInput, setUserInput] = useState({
    id: '',
    password: '',
  });
  const navigate = useNavigate();
  const inputChange = e => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };
  const { id, password } = userInput;

  const userLogin = async () => {
    try {
      // const response = await user.post(`${PATH_URL.LOGIN}`, userInput);
      const response = await user.post('/login', userInput); //테스트용
      // const accessHeader = response.headers.get('Authorization');
      // const token = accessHeader.split(' ')[1];
      // const userToken = jwtDecode(token);
      // const expirationTime = new Date(userToken.exp * 1000);
      // Cookies.set('token', token, { expires: expirationTime });
      Cookies.set('token', response.data.token); //테스트용
      // console.log(Cookies.get('token'));
      setUserInput({
        id: '',
        password: '',
      });
      // navigate(PATH_URL.HOME);
      window.location.replace(PATH_URL.HOME);
    } catch (error) {
      console.log(error); //통신시 키값 맞출 예정
      // alert('존재하지않는 id입니다');
    }
  };
  const goSinup = () => {
    navigate(PATH_URL.SIGNUP);
  };

  return (
    <MotionContainer
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <LoginContainer>
        <div>
          <Typography variant="h4">Login</Typography>
          <TextField
            label="ID"
            variant="outlined"
            margin="dense"
            fullWidth
            name="id"
            value={id}
            onChange={inputChange}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="dense"
            fullWidth
            name="password"
            value={password}
            onChange={inputChange}
          />
          <LoginBtnWrap>
            <div>
              <Button variant="outlined" fullWidth onClick={userLogin}>
                Login
              </Button>
            </div>
            <div>
              <Button variant="outlined" fullWidth onClick={goSinup}>
                signup
              </Button>
            </div>
          </LoginBtnWrap>
        </div>
      </LoginContainer>
    </MotionContainer>
  );
};
const LoginContainer = styled.div`
  margin: 0 auto;
  width: 35%;
  height: 400px;
  margin-top: 170px;
  display: flex;
  flex-direction: column;
  border: 2px solid #fbae03;
  border-radius: 10px;

  > div:first-child {
    width: 60%;
    margin: 0 auto;
    padding-top: 50px;
  }
`;
const LoginBtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 55px;
  width: 100%;
  gap: 10px;

  > div {
    width: 50%;
  }
`;

export default Login;
