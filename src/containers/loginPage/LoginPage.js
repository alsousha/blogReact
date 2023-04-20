import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './loginPage.css';

function LoginPage(props) {
  //   console.log('props', props);
  const navigate = useNavigate();
  //   const location = useLocation();
  //   const params = useParams();
  //   console.log(location);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handlLoginChange = (e) => {
    setLogin(e.target.value);
  };
  const handlPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleLogIn = (e) => {
    e.preventDefault();
    props.setIsLoggedIn(true); //change app state if user is logged
    props.setUserName(login); //send userName to header
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userName', login);
    navigate('/');
  };
  return (
    <div>
      <form className='loginForm' onSubmit={handleLogIn}>
        <h2>Login</h2>
        <div>
          <input
            value={login}
            onChange={handlLoginChange}
            type='text'
            className='logonFormInput'
            placeholder='login'
            required
          />
        </div>
        <div>
          <input
            value={password}
            onChange={handlPasswordChange}
            type='password'
            className='logonFormInput'
            placeholder='password'
            required
          />
        </div>
        <div>
          <button type='submit' className='blackBtn'>
            login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
