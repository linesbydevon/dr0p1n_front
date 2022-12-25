import {useContext, useState} from 'react'
import AuthContext from '../context/AuthContext'
import {Link} from 'react-router-dom'
import SVGVisibilityOff from '../assets/SVGVisibilityOff'
import SVGVisibility from '../assets/SVGVisibility'


export default function LoginPage(){
  let {loginUser} = useContext(AuthContext)
  let [visibility, setVisibility]=useState(false)
  const toggleVisibility = ()=>{
    console.log('clicked')
    setVisibility(!visibility);
  }
  return(
    <section className="form_login_register">
      <h2>Sign up</h2>
      <form onSubmit={loginUser}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" />
        <label htmlFor="password">Password:</label>
        <div className="inputWrapper">
        <input type={visibility ? "text":"password"} name="password" />
        {visibility?<SVGVisibilityOff onClick={toggleVisibility}/>:<SVGVisibility onClick={toggleVisibility}/>}
        </div>
        <label htmlFor="passwordConfirm">Confirm password:</label>
        <div className="inputWrapper">
        <input type={visibility ? "text":"password"} name="passwordConfirm" />
        {visibility?<SVGVisibilityOff onClick={toggleVisibility}/>:<SVGVisibility onClick={toggleVisibility}/>}
        </div>
        <button>register</button>
        <p>Already have an account? <Link className="inlineLink" to="/">Login</Link></p>
      </form>
    </section>
  )
}