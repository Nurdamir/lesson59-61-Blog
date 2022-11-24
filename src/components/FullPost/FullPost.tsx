import React, {useCallback, useEffect, useState} from 'react';
import './FullPost.css';
import {ApiPost} from "../../types";
import axios from "axios";

interface Props {
  id: number | null;
}

const FullPost: React.FC<Props> = ({id}) => {
  const [post, setPost] = useState<ApiPost | null>(null);

  const fetchPost = useCallback(async (id: number) => {
      const postResponse = await axios.get<ApiPost>('/posts/' + id);
      setPost(postResponse.data);
  }, []);

  useEffect(() => {
    if (id !== null) {
      fetchPost(id).catch(console.error);
    }
  }, [id, fetchPost]);


  return post ? (
    <div className="FullPost">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <div className="Edit">
        <button className="Delete">Delete</button>
      </div>
    </div>
  ) : (
    <div>Select a post!</div>
  );
};

export default FullPost;