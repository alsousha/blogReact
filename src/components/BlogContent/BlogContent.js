import { Component } from 'react';
import './BlogContent.css';
import { AddPostForm } from './components/AddPostForm';
import { EditPostForm } from './components/EditPostForm';
import { BlogCard } from './components/BlogCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

export class BlogContent extends Component {
  state = {
    showAddForm: false,
    showEditForm: false,
    blogArr: [],
    isPending: false,
    activEditPost: {},
  };

  likePost = (blogPost) => {
    const temp = { ...blogPost }; //copy data of post to temp
    temp.liked = !temp.liked; // change lacked
    axios
      .patch('http://localhost:3001/posts/' + blogPost.id, temp)
      .then((res) => {
        console.log('Post was changed', res.data);
        this.fetchPosts();
      })
      .catch((err) => {
        console.log('Sorry, we have some problem. Try again later', err);
      });
  };

  deletePost = (id, pos) => {
    this.setState({
      isPending: true,
    });
    // console.log('id', id);
    if (window.confirm(`Delete ${this.state.blogArr[pos].title}?`)) {
      axios
        .delete('http://localhost:3001/posts/' + id)
        .then((res) => {
          //get all posts
          this.fetchPosts();
        })
        .catch((err) => {
          console.log('Sorry, we have some problem. Try again later', err);
        });
      // localStorage.setItem('blogPosts', JSON.stringify(temp));
    } else {
      this.setState({
        isPending: false,
      });
    }
  };
  editBlogPost = (post) => {
    this.setState({
      isPending: true,
    });
    axios
      .patch('http://localhost:3001/posts/' + post.id, post)
      .then((res) => {
        //get all posts
        this.fetchPosts();
      })
      .catch((err) => {
        console.log('Sorry, we have some problem. Try again later', err);
      });
  };
  fetchPosts = () => {
    axios
      .get('http://localhost:3001/posts')
      .then((res) => {
        this.setState({
          blogArr: res.data,
          isPending: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleAddFormShow = () => {
    this.setState({
      showAddForm: true,
    });
  };

  handleAddFormHide = () => {
    this.setState({
      showAddForm: false,
    });
  };

  handleEditFormShow = (item) => {
    this.setState({
      showEditForm: true,
      activEditPost: item,
    });
  };
  handleEditFormHide = () => {
    this.setState({
      showEditForm: false,
    });
  };

  addNewBlogPost = (blogPost) => {
    this.setState({
      isPending: true,
    });
    axios
      .post('http://localhost:3001/posts/', blogPost)
      .then((res) => {
        console.log('Post was create', res.data);
        this.fetchPosts();
      })
      .catch((err) => {
        console.log('Sorry, we have some problem. Try again later', err);
      });
  };
  componentDidMount() {
    //get all posts
    this.fetchPosts();
  }

  render() {
    const blogPosts = this.state.blogArr.map((item, pos) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => this.likePost(item)}
          handleEditdFormShow={() => this.handleEditFormShow(item)}
          deletePost={() => this.deletePost(item.id, pos)}
        />
      );
    });

    //show loading data while we are getting data from server
    if (this.state.blogArr.length === 0) return <h1>Loading data...</h1>;

    const postsOpacity = this.state.isPending ? 0.5 : 1;
    return (
      <div className='blogPage'>
        {this.state.showAddForm && (
          <AddPostForm
            blogArr={this.state.blogArr}
            addNewBlogPost={this.addNewBlogPost}
            handleAddFormHide={this.handleAddFormHide}
          />
        )}
        {this.state.showEditForm && (
          <EditPostForm
            blogArr={this.state.blogArr}
            editBlogPost={(post) => this.editBlogPost(post)}
            handleEditFormHide={this.handleEditFormHide}
            activEditPost={this.state.activEditPost}
          />
        )}

        <>
          <h1>Simple Blog</h1>
          <button className='blackBtn' onClick={this.handleAddFormShow}>
            Создать новый пост
          </button>

          <div className='posts' style={{ opacity: postsOpacity }}>
            {blogPosts}
          </div>
          <div className='preloader'>{this.state.isPending && <CircularProgress />}</div>
        </>
      </div>
    );
  }
}
