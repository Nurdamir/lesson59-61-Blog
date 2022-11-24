import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import './Blog.css';
import {ApiPost, ApiUser, BlogPost} from "../../types";
import PostCard from "../../components/PostCard/PostCard";
import PostForm from "../../components/PostForm/PostForm";
import FullPost from "../../components/FullPost/FullPost";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [postFormShown, setPostFormShown] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const fetchData = useCallback(async () => {
    const postsResponse = await axios.get<ApiPost[]>('posts?_limit=4');

    const promises = postsResponse.data.map(async post => {
      const userResponse = await axios.get<ApiUser>('/users/' + post.userId);

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