import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import './Blog.css';
import {ApiPost, ApiUser, BlogPost} from "../../types";
import PostCard from "../../components/PostCard/PostCard";
import PostForm from "../../components/PostForm/PostForm";
import FullPost from "../../components/FullPost/FullPost";

const BASE_URL = 'https://jsonplaceholder.typicode.com/';
const POSTS_URL = 'posts?_limit=4';
const USER_URL = 'users/';

// const makeRequest = async <T, >(url: string): Promise<T> => {
//   const response = await fetch(url);
//
//   if (response.ok) {
//     return response.json();
//   }
//
//   throw new Error('Something went wrong with network request');
// };
// Эту функцию буду использовать, если axios не понравиться!!!



const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [postFormShown, setPostFormShown] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const fetchData = useCallback(async () => {
    const postsResponse = await axios.get<ApiPost[]>(BASE_URL + POSTS_URL);

    const promises = postsResponse.data.map(async post => {
      const userUrl = BASE_URL + USER_URL + post.userId;
      const userResponse = await axios.get<ApiUser>(userUrl);

      return {
        id: post.id,
        title: post.title,
        author: userResponse.data.name,
      };
    });
    const newPosts = await Promise.all(promises);
    setPosts(newPosts);
  }, []);


  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const togglePostForm = () => setPostFormShown(prev => !prev);

  let postForm = null;

  if (postFormShown) {
    postForm = <PostForm/>;
  }

  return (
    <>
      <section className="Posts">
        {posts.map(post => (
          <PostCard
            key={post.id}
            title={post.title}
            author={post.author}
            onClick={() => setSelectedPostId(post.id)}
          />
        ))}
      </section>
      <section>
        <FullPost id={selectedPostId}/>
      </section>
      <button onClick={togglePostForm}>
        New post
      </button>
      {postForm}
    </>
  )
};

export default Blog;