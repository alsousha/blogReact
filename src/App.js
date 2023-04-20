import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { BlogContent } from './containers/BlogContent/BlogContent';
import LoginPage from './containers/loginPage/LoginPage';
import { useState } from 'react';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  //   const tmp = [() => <LoginPage />, () => <BlogContent />];
  return (
    <BrowserRouter>
      <div className='App'>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userName={userName} />

        <main>
          <Routes>
            <Route
              path='/login'
              element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />}
            />
            <Route path='/' element={<BlogContent />} />
          </Routes>
        </main>

        <Footer year={new Date().getFullYear()} />
      </div>
    </BrowserRouter>
  );
}
