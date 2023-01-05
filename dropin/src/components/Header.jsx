import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import LogoSvg from "../assets/LogoSVG";
import SVGLogout from "../assets/SVGLoutout";
import SVGSettings from "../assets/SVGSettings";

export default function Header() {
  let { user, logoutUser, tokens } = useContext(AuthContext);
  return (
    <header>
      <div className="container">
        <LogoSvg />
      </div>
      {tokens && user && (
        <div className="loggedIn">
          <div className="container">
            <div className="profileInfo">
              <img
                src={
                  user.image
                    ? user.image
                    : "https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg"
                }
                alt="profile avatar"
              />
              <p className="username">
                {user.user.username} <SVGSettings />
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
