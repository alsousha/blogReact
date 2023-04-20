import { NavLink } from 'react-router-dom';
import './Header.css';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

export const Header = ({ isLoggedIn, setIsLoggedIn, userName }) => {
  console.log('isLogged: ', isLoggedIn);
  const handleLogOut = () => {
    //change app state for logout
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('userName', '');
  };
  return (
    <header>
      {isLoggedIn ? (
        <nav>
          Hello, {userName}
          <NavLink onClick={handleLogOut} to='/login'>
            <MeetingRoomIcon />
            Logout
          </NavLink>
        </nav>
      ) : (
        'Hello, guest!'
      )}
    </header>
  );
};
