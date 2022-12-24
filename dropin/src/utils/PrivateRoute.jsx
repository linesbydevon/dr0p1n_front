import {Route, Routes} from 'react-router-dom'

export default function PrivateRoute({children, ...rest}){
  const authenticated = false;
  console.log('private route')
  return(
    <p>blah</p>
  )
}