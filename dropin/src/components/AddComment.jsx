import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function AddComment({ spot, changeToggle, setChangeToggle }) {
  const { user, baseURL } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formField = new FormData();
    formField.append("content", e.target.content.value);
    formField.append("spot", spot.id);
    formField.append("user", user.id);

    await axios({
      method: "post",
      url: `${baseURL}/api/addcomments/`,
      data: formField,
    }).then((response) => {
      e.target.content.value = "";
      setChangeToggle(!changeToggle);
    });
  };

  return (
    <div className="addComment">
      <form onSubmit={handleSubmit}>
        <textarea name="content" draggable="false"></textarea>
        <button>Comment</button>
      </form>
    </div>
  );
}
