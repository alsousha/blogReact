import { Component } from 'react';
import './BlogContent.css';
import { AddPostForm } from './components/AddPostForm';
import { BlogCard } from './components/BlogCard';
import axios from 'axios';

export class BlogContent extends Component {
  state = {
    showAddForm: false,
    blogArr: [],
    isPending: false,
  };

  likePost = (pos) => {
    const temp = [...this.state.blogArr];
    temp[pos].liked = !temp[pos].liked;

    this.setState({
      blogArr: temp,
    });

    localStorage.setItem('blogPosts', JSON.stringify(temp));
  };

  deletePost = (id, pos) => {
    // console.log('id', id);
    if (window.confirm(`Delete ${this.state.blogArr[pos].title}?`)) {
      axios
        .delete('http://localhost:3001/posts/' + id)
        .then((res) => {
          //get all posts
          this.fetchPosts();
        })
        .catch(() => {
          alert('Sorry, we have some problem. Try again later');
        });
      // localStorage.setItem('blogPosts', JSON.stringify(temp));
    }
  };
  fetchPosts = () => {
    this.setState({
      isPending: true,
    });
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

  handleEscape = (e) => {
    if (e.key === 'Escape' && this.state.showAddForm) this.handleAddFormHide();
  };

  addNewBlogPost = (blogPost) => {
    console.log('bl', blogPost);
    console.log(blogPost.id);
    axios.post('http://localhost:3001/posts', blogPost.id).then();
    // this.setState((state) => {
    //   const temp = [...state.blogArr];
    //   temp.push(blogPost);
    //   localStorage.setItem('blogPosts', JSON.stringify(temp));
    //   return {
    //     blogArr: temp,
    //   };
    // });
  };
  componentDidMount() {
    //get all posts
    this.fetchPosts();
    //hide popup by Esc
    window.addEventListener('keyup', this.handleEscape);
  }
  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleEscape);
  }
  render() {
    const blogPosts = this.state.blogArr.map((item, pos) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => this.likePost(pos)}
          deletePost={() => this.deletePost(item.id, pos)}
        />
      );
    });

    //show loading data while we are getting data from server
    if (this.state.blogArr.length === 0) return <h1>Loading data...</h1>;

    return (
      <div className='blogPage'>
        {this.state.showAddForm && (
          <AddPostForm
            blogArr={this.state.blogArr}
            addNewBlogPost={this.addNewBlogPost}
            handleAddFormHide={this.handleAddFormHide}
          />
        )}

        <>
          <h1>Simple Blog</h1>
          <button className='blackBtn' onClick={this.handleAddFormShow}>
            Создать новый пост
          </button>
          {this.state.isPending && <h2>Please wait...</h2>}
          <div className='posts'>{blogPosts}</div>
        </>
      </div>
    );
  }
}
