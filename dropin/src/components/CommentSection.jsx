import Comment from "./Comment"
import AddComment from "./AddComment"

export default function CommentSection({spot, changeToggle, setChangeToggle}){
  return(
    <div className="commentsSection">
    <h3>Comments</h3>
    <AddComment spot={spot} setChangeToggle={setChangeToggle} changeToggle={changeToggle}/>
    {spot.spotcomments.length ? (
      spot.spotcomments.map((comment) => (
        <Comment key={comment.id} comment={comment} changeToggle={changeToggle} setChangeToggle={setChangeToggle}/>
      ))
    ) : (
      <p>No comments</p>
    )}
  </div>
  )
}