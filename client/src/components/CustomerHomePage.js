import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage({ user }) {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/posts').then(res => setPosts(res.data));
  }, []);

  const handlePost = async () => {
    if (!comment) return;
    const res = await axios.post('http://localhost:3000/posts', {
      email: user.email,
      username: user.username,
      comment
    });
    setPosts([res.data, ...posts]);
    setComment('');
  };

  const handleLike = async (id) => {
    const res = await axios.post(`http://localhost:3000/posts/${id}/like`);
    setPosts(posts.map(p => p._id === id ? res.data : p));
  };

  return (
    <div>
      <h2>Welcome to Laptop Store</h2>
      <div>
        <h3>Share a Post</h3>
        <textarea value={comment} onChange={e => setComment(e.target.value)} />
        <button onClick={handlePost}>Post</button>
      </div>
      <div>
        <h3>Posts</h3>
        {posts.map(post => (
          <div key={post._id} style={{ border: '1px solid #ccc', margin: 8, padding: 8 }}>
            <div><b>{post.username}</b> ({post.email})</div>
            <div>{post.comment}</div>
            <div>
              <button onClick={() => handleLike(post._id)}>Like</button> {post.likes}
              <span style={{ float: 'right' }}>{new Date(post.createdAt).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;