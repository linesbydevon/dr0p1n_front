import {createContext, useState, useEffect} from 'react'
import jwt_decode from "jwt-decode";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
  let [loading, setLoading] = useState(true);
  let [user, setUser] = useState(null);
  let [tokens, setTokens] = useState(null);


  const loginUser = async (e)=>{
    e.preventDefault();
    let response = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'

      },
      body: JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
    })
    let data = await response.json()
    console.log('response:',response)
    console.log('data:',data)
    if(response.status === 200){
      localStorage.setItem('authTokens', JSON.stringify(data))
      localStorage.setItem('user', JSON.stringify(jwt_decode(data.access)))
      setTokens(data)
      setUser(jwt_decode(data.access))
    }
  }

  const logoutUser = ()=>{
    setTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    localStorage.removeItem('user')
  }
  
  const updateToken= async()=>{
    let response = await fetch('http://localhost:8000/api/token/refresh/', {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'

      },
      body: JSON.stringify({'refresh': tokens.refresh})
    })
    let data = await response.json()
    if (response.status === 200){
      localStorage.setItem('authTokens', JSON.stringify(data))
      localStorage.setItem('user', JSON.stringify(jwt_decode(data.access)))
      setTokens(data)
      setUser(jwt_decode(data.access))
      
    } else{
      logoutUser()
    }
  }

  useEffect(()=>{
    if(localStorage.getItem('authTokens')){
      setTokens(localStorage.getItem('authTokens'))
    }
    if(localStorage.getItem('user')){
      setUser(localStorage.getItem('user'))
    }
  
  },[])

  useEffect(()=>{
    let fourMinutes = 1000*60*4;
    if (tokens){
      let interval = setInterval(()=>{
        console.log(`refresh req sent with request token ${tokens.refresh}`)
        updateToken();
      }, fourMinutes)
      return ()=>clearInterval(interval)
    }

  }, [tokens, loading])

  let contextData = {
    tokens: tokens,
    user: user,
    loginUser:loginUser,
    logoutUser: logoutUser,
    updateToken: updateToken

  }
  return(
    <AuthContext.Provider value = {contextData} >
      {children}
    </AuthContext.Provider>
  )
}

