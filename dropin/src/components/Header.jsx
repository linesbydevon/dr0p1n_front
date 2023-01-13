import { useContext } from "react";
import {useNavigate} from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import LogoSvg from "../assets/LogoSVG";
import SVGLogout from "../assets/SVGLoutout";
import SVGSettings from "../assets/SVGSettings";
import defaultPFP from "../assets/defaultPFP.png"

export default function Header() {
  let { user, logoutUser, tokens } = useContext(AuthContext);
  let navigate = useNavigate();
  return (
    <header>
      <div className="container">
        <LogoSvg handleClick={()=>navigate('/')}/>
      </div>
      {tokens && user && (
        <div className="loggedIn">
          <div className="container">
            <div className="profileInfo">
              <img
                src={
                  user.imageURL
                    ? user.imageURL
                    : defaultPFP
                }
                alt="profile avatar"
              />
              <p className="username">
                {user.user.username}
              </p>
            </div>
            <div className="logoutSection">
              <a href="/" onClick={logoutUser}>
                Logout <SVGLogout />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
