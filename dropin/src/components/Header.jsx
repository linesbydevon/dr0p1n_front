import {NavLink} from 'react-router-dom';
import {useContext} from 'react'
import AuthContext from '../context/AuthContext';
import LogoSvg from '../assets/LogoSVG';

export default function Header(){
  let {user, logoutUser} = useContext(AuthContext)
  return(
    <header>
      <div className="container">
        <LogoSvg/>
      {user && <p>Hello {user.username}</p>}
      </div>
    </header>
  )
}