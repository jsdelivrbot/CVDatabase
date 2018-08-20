import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "../actions";
import MethodLogger from '../util-decorators/logger';

@connect(
  state => ({
    posts: state.posts
  }), 
  { 
    fetchPosts
  }
)
class PostsIndex extends Component {
  
  @MethodLogger(false)
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={"posts/" + post.id}>
            <strong>{post.title}</strong>
            <div>{post.categories}</div>
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <br/>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

export default PostsIndex;
