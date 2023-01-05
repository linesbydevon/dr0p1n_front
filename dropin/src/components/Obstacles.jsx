import { useContext } from "react";
import Obstacle from "./Obstacle";
import axios from "axios";
import AuthContext from "../context/AuthContext";
export default function Obstacles({ spot, changeToggle, setChangeToggle }) {
  const { baseURL } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      name: e.target.name.value,
      spot: spot.id,
    };
    let response = await axios.post(`${baseURL}/api/obstacles/`, data);
    if (response.status === 201) {
      setChangeToggle(!changeToggle);
      e.target.name.value = "";
    }
  };

  return (
    <div className="obstaclesSection">
      <h3>Obstacles</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Add obstacle" name="name" />
        <button>+</button>
      </form>
      {spot.obstacles.length ? (
        spot.obstacles.map((obstacle) => (
          <Obstacle
            obstacle={obstacle}
            setChangeToggle={setChangeToggle}
            changeToggle={changeToggle}
          />
        ))
      ) : (
        <p>No obstacles</p>
      )}
    </div>
  );
}
