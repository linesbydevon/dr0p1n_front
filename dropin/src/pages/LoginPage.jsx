import {useContext} from 'react'
import AuthContext from '../context/AuthContext'
export default function LoginPage(){
  let {loginUser} = useContext(AuthContext)
  return(
    <section className="form_login_register">
      <h2>Sign in</h2>
      <form onSubmit={loginUser}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" />
        <button>login</button>
        <p>New here? <a className="inlineLink" href="/">Register today</a></p>
      </form>
    </section>
  )
}