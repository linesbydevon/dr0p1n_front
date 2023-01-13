import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import SVGDelete from "../assets/SVGDelete";
import axios from "axios";
import defaultPFP from "../assets/defaultPFP.png"
export default function Comment({
  comment,
  changeToggle,
  setChangeToggle,
}) {
  const { user, baseURL } = useContext(AuthContext);

  const handleDelete = async () => {
    let response = await axios.delete(
      `${baseURL}/api/addcomments/${comment.id}`
    );
    if (response.status === 204) {
      setChangeToggle(!changeToggle);
    }
  };
  return (
    <div className="comment">
      <div className="commentUserInfo">
        <img
          src={
            comment.user.imageURL
              ? comment.user.imageURL
              : defaultPFP
          }
          alt="profile avatar"
        />
        <h4>{comment.user.user.username}</h4>
        {comment.user.id === user.id && <SVGDelete onClick={handleDelete} />}
      </div>
      <div className="commentBody">
        {comment.image && (
          <img src={comment.image} alt="attached media for comment" />
        )}
        <p>{comment.content}</p>
      </div>
    </div>
  );
}
