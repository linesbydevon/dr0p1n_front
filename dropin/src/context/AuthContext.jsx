import {createContext, useState, useEffect} from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
  let [loading, setLoading] = useState(true);
  let [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')):null);
  let [tokens, setTokens] = useState(null);
  const [clickedCoordinates, setClickedCoordinates] = useState(null);
  const mapboxAccessToken = process.env.REACT_APP_MAPBOX_TOKEN;
  const baseURL = 'http://localhost:8000';

  const loginUser = async (e)=>{
    e.preventDefault();
    let response = await axios.post(`${baseURL}/api/token/`, {'username':e.target.username.value, 'password':e.target.password.value});
    let data = await response.data;
    let authUser = jwt_decode(data.access);
    if(response.status === 200){
      localStorage.setItem('authTokens', JSON.stringify(data));
      setTokens(data)
      let profileResponse = await axios.get(`${baseURL}/api/skaters/${authUser.user_id}`)
      if(profileResponse.status === 200){
        setUser(profileResponse.data)
        localStorage.setItem('user', JSON.stringify(profileResponse.data))
      }
    }
  }

  const logoutUser = ()=>{
    setTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    localStorage.removeItem('user')
  }
  
  const updateToken= async()=>{
    let response = await axios.post(`${baseURL}/api/token/refresh/`, {'refresh': tokens.refresh});
    let data = await response.data;

    if (response.status === 200){
      localStorage.setItem('authTokens', JSON.stringify(data))
      setTokens(data)
    } else{
      logoutUser()
    }
  }

  useEffect(()=>{
    if(localStorage.getItem('authTokens')){
      setTokens(localStorage.getItem('authTokens'))
    }
    if(localStorage.getItem('user')){
      setUser(JSON.parse(localStorage.getItem('user')))
      console.log(user)
    }
  
  },[])

  useEffect(()=>{
    let fourMinutes = 1000*60*4;
    if (tokens){
      let interval = setInterval(()=>{
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
    updateToken: updateToken,
    baseURL: baseURL,
    mapboxAccessToken: mapboxAccessToken,
    clickedCoordinates,
    setClickedCoordinates

  }
  return(
    <AuthContext.Provider value = {contextData} >
      {children}
    </AuthContext.Provider>
  )
}

