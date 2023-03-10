import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import SVGVisibilityOff from "../assets/SVGVisibilityOff";
import SVGVisibility from "../assets/SVGVisibility";
import axios from "axios";

export default function LoginPage() {
  const { baseURL } = useContext(AuthContext);
  let [visibility, setVisibility] = useState(false);
  let navigate = useNavigate();
  const toggleVisibility = () => {
    setVisibility(!visibility);
  };
  const register = async (e) => {
    e.preventDefault();
    let body = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    let response = await axios.post(`${baseURL}/api/signup/`, body);
    if (response.status === 201) {
      let userId = response.data.id;
      let profileBody = {
        image: null,
        user: userId,
        dropin: null,
      };
      let profileResponse = await axios.post(
        `${baseURL}/api/addskater/`,
        profileBody
      );
      if (profileResponse.status === 201) {
        navigate("/");
      }
    }
  };
  return (
    <section className="form_login_register">
      <h2>Sign up</h2>
      <form onSubmit={register}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" />
        <label htmlFor="password">Password:</label>
        <div className="inputWrapper">
          <input type={visibility ? "text" : "password"} name="password" />
          {visibility ? (
            <SVGVisibilityOff onClick={toggleVisibility} />
          ) : (
            <SVGVisibility onClick={toggleVisibility} />
          )}
        </div>
        <label htmlFor="passwordConfirm">Confirm password:</label>
        <div className="inputWrapper">
          <input
            type={visibility ? "text" : "password"}
            name="passwordConfirm"
          />
          {visibility ? (
            <SVGVisibilityOff onClick={toggleVisibility} />
          ) : (
            <SVGVisibility onClick={toggleVisibility} />
          )}
        </div>
        <button>register</button>
        <p>
          Already have an account?{" "}
          <Link className="inlineLink" to="/">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}
