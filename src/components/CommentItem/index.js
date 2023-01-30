// Write your code here
import {Component} from 'react'
import './index.css'

class CommentItem extends Component {
  state = {like: false}

  onClickingLike = () => {
    this.setState(prevState => ({like: !prevState.like}))
  }

  render() {
    const {like} = this.state
    const {eachCommentInfo, commentsAfterDeleting} = this.props
    const {id, name, comment, time, randBackgroundColor} = eachCommentInfo
    const firstLetter = name[0].toUpperCase()
    let likeImgUrl
    let likeHighLight
    if (like === false) {
      likeImgUrl =
        'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
    } else {
      likeImgUrl =
        'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
      likeHighLight = 'like-high-light'
    }
    const onDeletingComment = () => {
      commentsAfterDeleting(id)
    }
    return (
      <li>
        <div className="img-name-comment-container">
          <div className={`first-letter ${randBackgroundColor}`}>
            {firstLetter}
          </div>
          <div className="name-comment-container">
            <div className="name-time-container">
              <h1 className="name">{name}</h1>
              <p className="time">{time}</p>
            </div>
            <p className="comment">{comment}</p>
          </div>
        </div>
        <div className="like-delete-container">
          <div className="img-like-container">
            <img src={likeImgUrl} className="like-img" alt="like" />
            <button
              type="button"
              className={`button ${likeHighLight}`}
              onClick={this.onClickingLike}
            >
              Like
            </button>
          </div>

          <button type="button" onClick={onDeletingComment} testid="delete">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
              className="delete-icon"
              alt="delete"
            />
          </button>
        </div>
        <hr />
      </li>
    )
  }
}

export default CommentItem
