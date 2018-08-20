import axios from "axios";

export const FETCH_POSTS = "fetch_posts";
export const FETCH_POST = "fetch_post";
export const CREATE_POST = "create_post";
export const DELETE_POST = "delete_post";

const ROOT_URL = "http://reduxblog.herokuapp.com/api";
const API_KEY = "?key=bDVCGUWSES2359SN";

export const fetchPosts = () => dispatch => {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  return request.then((data) => {
    dispatch({
      type: FETCH_POSTS,
      payload: request
    });
  });   
}

export const createPost = (values) => dispatch => {
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values);
  return request.then((data) => {
    dispatch({
      type: CREATE_POST,
      payload: data
    });
  });   
}

export const fetchPost = (id) => dispatch => {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)
  return request.then((data) => {
    dispatch({
      type: FETCH_POST,
      payload: data
    });
  });   
}

export const deletePost = (id) => dispatch => {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
  return request.then((data) => {
    dispatch({
      type: DELETE_POST,
      payload: data
    });
  });   
}