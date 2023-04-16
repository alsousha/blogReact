import { Component } from 'react';
import { posts } from '../../shared/projectData';
import './BlogContent.css';
import { AddPostForm } from './components/AddPostForm';
import { BlogCard } from './components/BlogCard';
import axios from 'axios';

export class BlogContent extends Component {
  state = {
    showAddForm: false,
    blogArr: JSON.parse(localStorage.getItem('blogPosts')) || posts,
  };

  likePost = (pos) => {
    const temp = [...this.state.blogArr];
    temp[pos].liked = !temp[pos].liked;

    this.setState({
      blogArr: temp,
    });

    localStorage.setItem('blogPosts', JSON.stringify(temp));
  };

  deletePost = (pos) => {
    if (window.confirm(`Удалить ${this.state.blogArr[pos].title}?`)) {
      const temp = [...this.state.blogArr];
      temp.splice(pos, 1);

      console.log('Эталонный массив =>', this.state.blogArr);
      console.log('Измененный массив =>', temp);

      this.setState({
        blogArr: temp,
      });

      localStorage.setItem('blogPosts', JSON.stringify(temp));
    }
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
    this.setState((state) => {
      const temp = [...state.blogArr];
      temp.push(blogPost);
      localStorage.setItem('blogPosts', JSON.stringify(temp));
      return {
        blogArr: temp,
      };
    });
  };
  componentDidMount() {
    // axios
    //   .get('https://5fb3db44b6601200168f7fba.mockapi.io/api/posts')
    //   .then((res) => {
    //     blogArr: res.data;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
          deletePost={() => this.deletePost(pos)}
        />
      );
    });
    return (
      <div className='blogPage'>
        {this.state.showAddForm ? (
          <AddPostForm
            blogArr={this.state.blogArr}
            addNewBlogPost={this.addNewBlogPost}
            handleAddFormHide={this.handleAddFormHide}
          />
        ) : null}

        <>
          <h1>Simple Blog</h1>
          <button className='blackBtn' onClick={this.handleAddFormShow}>
            Создать новый пост
          </button>
          <div className='posts'>{blogPosts}</div>
        </>
      </div>
    );
  }
}
