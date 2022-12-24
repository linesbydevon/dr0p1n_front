import {NavLink} from 'react-router-dom';
import {useContext} from 'react'
import AuthContext from '../context/AuthContext';

export default function Header(){
  let {user, logoutUser} = useContext(AuthContext)
  return(
    <header>

      {user && <p>Hello {user.username}</p>}
      <nav>
        <NavLink to="/" end>Home</NavLink>
        {user ? <a href="/" onClick={logoutUser}>Logout</a> : <NavLink to="/login" end>Login</NavLink>}
       
      </nav>
    </header>
  )
}