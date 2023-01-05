import SVGDelete from "../assets/SVGDelete";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Obstacle({ obstacle, setChangeToggle, changeToggle }) {
  const { baseURL } = useContext(AuthContext);
  const handleDelete = async () => {
    let response = await axios.delete(
      `${baseURL}/api/obstacles/${obstacle.id}`
    );
    if (response.status === 204) {
      setChangeToggle(!changeToggle);
    }
  };
  return (
    <div className="obstacleContainer">
      <p>{obstacle.name}</p>
      <SVGDelete onClick={handleDelete} />
    </div>
  );
}
