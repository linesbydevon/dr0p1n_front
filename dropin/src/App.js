import './App.css';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthContext from './context/AuthContext';
import {Routes, Route} from 'react-router-dom';
import {useContext } from 'react'


function App() {
  let {user} = useContext(AuthContext)
  return (
    <div className="App">
    
        <Header/>
        <main>
        <Routes>
        <Route path="/" exact element={!user ? <LoginPage/>:<Homepage/>}/>
        </Routes>
        </main>
     
<Footer/>
    </div>
  );
}

export default App;
