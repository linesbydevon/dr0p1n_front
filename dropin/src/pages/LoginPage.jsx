import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import SVGVisibility from "../assets/SVGVisibility";
import SVGVisibilityOff from "../assets/SVGVisibilityOff";
export default function LoginPage() {
  let { loginUser } = useContext(AuthContext);
  let [visibility, setVisibility] = useState(false);
  const toggleVisibility = () => {
    setVisibility(!visibility);
  };
  return (
    <section className="form_login_register">
      <h2>Sign in</h2>
      <form onSubmit={loginUser}>
        <label htmlFor="username">Username:</label>

        <input type="text" name="username"></input>

        <label htmlFor="password">Password:</label>
        <div className="inputWrapper">
          <input type={visibility ? "text" : "password"} name="password" />
          {visibility ? (
            <SVGVisibilityOff onClick={toggleVisibility} />
          ) : (
            <SVGVisibility onClick={toggleVisibility} />
          )}
        </div>
        <button>login</button>
        <p>
          New here?{" "}
          <Link className="inlineLink" to="/register">
            Register today
          </Link>
        </p>
      </form>
    </section>
  );
}
