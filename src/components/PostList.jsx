import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import config from '../config';

export function Post({ posts }) {
  const navigate = useNavigate();
  return (
    <div>
      <h1> Posts </h1>
      <input
        type="text"
        placeholder="Search Posts"
      />
      <div className="posts-container">
        {posts.map((post) => (
          <div
            className="post-card"
            key={post.id}
          >

            <img src={post.imageUrl} alt={post.name} style={{ width: '100%', height: 'auto' }} />
            <h3>{post.name}</h3>
            <p>{post.description}</p>
            <p>
              Price: $
              {post.price}
              {' '}
              - Quantity:
              {post.quantity}
            </p>
            <p>
              Purchase Date:
              {post.purchaseDate}
              {' '}
              - Expiry Date:
              {post.expiryDate}
            </p>
            <button type="button" onClick={() => navigate(`/posts/${post.id}`)}>Detail</button>
          </div>
        ))}
      </div>
    </div>
  );
}

Post.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${config.backend_url}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return <Post posts={posts} />;
}

export default PostList;

PostList.propTypes = {
};
