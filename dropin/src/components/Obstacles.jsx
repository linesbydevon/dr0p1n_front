import SVGDelete from "../assets/SVGDelete";
import {useContext} from 'react';
import Obstacle from "./Obstacle";
import axios from 'axios';
export default function Obstacles({spot, changeToggle, setChangeToggle}){
  
  
  return(
    <div className="obstaclesSection">
    
    <h3>Obstacles</h3>
    <form>
      <input type="text" placeholder="Add obstacle"/>
      <button>+</button>
    </form>
    {spot.obstacles.length?
    spot.obstacles.map(obstacle=><Obstacle obstacle={obstacle} setChangeToggle={setChangeToggle} changeToggle={changeToggle}/>): <p>No obstacles</p>
    }
  </div>
  )
}