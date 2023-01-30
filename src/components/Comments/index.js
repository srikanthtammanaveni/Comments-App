import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const commentsImgUrl =
  'https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png '

class Comments extends Component {
  state = {currentCommentsList: [], nameInput: '', commentInput: ''}

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeTextAreaInput = event => {
    this.setState({commentInput: event.target.value})
  }

  onAddingComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    if (nameInput !== '' && commentInput !== '') {
      const timeNow = new Date()
      const timeGap = formatDistanceToNow(timeNow)
      const randomColor =
        initialContainerBackgroundClassNames[
          Math.floor(
            Math.random() * initialContainerBackgroundClassNames.length,
          )
        ]
      const commentInfo = {
        id: uuidv4(),
        name: nameInput,
        comment: commentInput,
        time: timeGap,
        randBackgroundColor: randomColor,
      }
      this.setState(prevState => ({
        currentCommentsList: [...prevState.currentCommentsList, commentInfo],
        nameInput: '',
        commentInput: '',
      }))
    } else if (nameInput === '' && commentInput !== '') {
      // eslint-disable-next-line no-alert
      alert('Please Enter Name')
    } else if (nameInput !== '' && commentInput === '') {
      // eslint-disable-next-line no-alert
      alert('Please Write Comment')
    } else {
      // eslint-disable-next-line no-alert
      alert('Please Enter Details')
    }
  }

  commentsAfterDeleting = id => {
    const {currentCommentsList} = this.state
    const newCommentsList = currentCommentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({currentCommentsList: newCommentsList})
  }

  render() {
    const {currentCommentsList, nameInput, commentInput} = this.state
    const count = currentCommentsList.length
    return (
      <div className="main-container">
        <h1 className="main-heading">Comments</h1>
        <form className="sub-container1" onSubmit={this.onAddingComment}>
          <div className="input-elements-container">
            <p className="say-something-para">
              Say something about 4.0 Technologies
            </p>
            <input
              type="text"
              className="name-input-element"
              placeholder="Your Name"
              onChange={this.onChangeNameInput}
              value={nameInput}
            />
            <textarea
              rows="10"
              cols="40"
              className="text-area-element"
              onChange={this.onChangeTextAreaInput}
              value={commentInput}
              placeholder="Your Comment"
            />
            <button type="submit" className="add-button">
              Add Comment
            </button>
          </div>
          <img src={commentsImgUrl} className="main-img" alt="comments" />
        </form>
        <hr />
        <div className="comments-count-container">
          <div className="count">{count}</div>
          <p className="comments-para">Comments</p>
        </div>
        <ul>
          {currentCommentsList.map(eachCommentInfo => (
            <CommentItem
              eachCommentInfo={eachCommentInfo}
              commentsAfterDeleting={this.commentsAfterDeleting}
              key={eachCommentInfo.id}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
