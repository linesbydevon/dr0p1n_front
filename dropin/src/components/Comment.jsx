import {useContext} from 'react';
import AuthContext from '../context/AuthContext';
import SVGDelete from '../assets/SVGDelete';
import axios from 'axios';
export default function Comment({comment, setCommentPosted, commentPosted, changeToggle, setChangeToggle}){
  const {user, baseURL} = useContext(AuthContext)

  const handleDelete= async ()=>{
    let response = await axios.delete(`${baseURL}/api/addcomments/${comment.id}`)
    console.log(response)
    if (response.status===204){
      setChangeToggle(!changeToggle);
    }
  }
  return(
    <div className="comment">
          <div className="commentUserInfo">
            <img
              src={
                comment.user.image
                  ? comment.user.image
                  : "https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg"
              }
              alt="profile avatar"
            />
            <h4>{comment.user.user.username}</h4>
            {comment.user.id === user.id && <SVGDelete onClick={handleDelete}/>}
          </div>
          <div className="commentBody">
            {comment.image && (
              <img
                src={comment.image}
                alt="attached media for comment"
              />
            )}
            <p>{comment.content}</p>
          </div>
        </div>
  )
}