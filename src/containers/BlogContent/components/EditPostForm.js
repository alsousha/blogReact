import './EditPostForm.css';
import CancelIcon from '@material-ui/icons/Cancel';
import { Component } from 'react';

export class EditPostForm extends Component {
  state = {
    postTitle: this.props.activEditPost.title,
    postDesc: this.props.activEditPost.description,
  };

  handlePostTitleChange = (e) => {
    this.setState({
      postTitle: e.target.value,
    });
  };

  handlePostDescChange = (e) => {
    this.setState({
      postDesc: e.target.value,
    });
  };
  changePost = (e) => {
    e.preventDefault(); //not reload page after click by submit
    const editedPost = {
      //   id: this.props.blogArr.length + 1,
      title: this.state.postTitle,
      description: this.state.postDesc,
      liked: this.props.activEditPost.liked,
      id: this.props.activEditPost.id,
    };
    this.props.editBlogPost(editedPost);
    this.props.handleEditFormHide();
  };
  handleEscape = (e) => {
    if (e.key === 'Escape') this.props.handleEditFormHide();
  };
  componentDidMount() {
    //hide popup by Esc
    window.addEventListener('keyup', this.handleEscape);
  }
  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleEscape);
  }
  render() {
    const handleEditFormHide = this.props.handleEditFormHide;
    const post = this.props.activEditPost;
    return (
      <>
        <form action='' className='addPostForm' onSubmit={this.changePost}>
          <button className='hideBtn' onClick={handleEditFormHide}>
            <CancelIcon />
          </button>
          <h2>Edit post: {post.title}</h2>
          <div>
            <input
              className='addFormInput'
              type='text'
              name='postTitle'
              placeholder='Title'
              value={this.state.postTitle}
              onChange={this.handlePostTitleChange}
              required
            />
          </div>
          <div>
            <textarea
              className='addFormInput'
              name='postDescription'
              placeholder='Text'
              value={this.state.postDesc}
              onChange={this.handlePostDescChange}
              rows={8}
              required
            />
          </div>
          <div>
            <button className='blackBtn' type='submit'>
              Save post
            </button>
          </div>
        </form>
        <div onClick={handleEditFormHide} className='overlay'></div>
      </>
    );
  }
}
