import {useContext} from 'react'
import AuthContext from '../context/AuthContext'
export default function LoginPage(){
  let {loginUser} = useContext(AuthContext)
  return(
    <div>
      <form onSubmit={loginUser}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button>login</button>
      </form>
    </div>
  )
}