// ReadPosts.js
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client';
import { Link } from 'react-router-dom';

const ReadPosts = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('time'); // Default sort by time
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      let { data: posts, error } = await supabase.from('Posts').select('*').order(sortBy === 'time' ? 'created_at' : 'betCount', { ascending: false });
      if (error) console.log('Error fetching posts:', error);
      else setPosts(posts);
    };

    fetchPosts();
  }, [sortBy]); // Re-fetch posts when sortBy changes

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <div>
        Sort by:{' '}
        <select value={sortBy} onChange={handleSortChange}>
          <option value="time">Time</option>
          <option value="betCount">Likes</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by title..."
        />
      </div>
      <div>
        {filteredPosts.map((post) => (
          <Link key={post.id} to={`/post/${post.id}`}>
            <Card
              id={post.id}
              title={post.title}
              author={post.author}
              description={post.description}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ReadPosts;
