import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPost, deletePost } from "../actions";
import MethodLogger from "../util-decorators/logger";
import { withRouter } from 'react-router';

// Router properties on props
// @withRouter()
@connect(
  (state, ownProps) => ({
    post: state.posts[ownProps.match.params.id]
  }), 
  { 
    fetchPost,
    deletePost
  }
)
class PostsShow extends Component {

  @MethodLogger(false)
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }

  @MethodLogger(true)
  onDeleteClick() {
    this.props.deletePost(this.props.match.params.id)
      .then(() => { this.props.history.push("/"); });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <br/>
        <Link to="/">Back To Index</Link>
        <br/>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <br/>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <br/>
        <p>{post.content}</p>
      </div>
    );
  }
}

export default PostsShow;