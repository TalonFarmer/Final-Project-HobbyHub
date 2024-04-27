// PostDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data: postData, error } = await supabase
          .from('Posts')
          .select('*')
          .eq('id', id)
          .single();
        if (error) throw error;
        setPost(postData);
      } catch (error) {
        console.error('Error fetching post:', error);
        // Handle error or show error message to the user
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    if (commentText.trim() === '') return;

    try {
      const updatedPost = { ...post, comments: [...(post.comments || []), commentText] };
      const { error } = await supabase.from('Posts').upsert(updatedPost, { returning: 'minimal' });
      if (error) throw error;
      setPost(updatedPost);
      setCommentText('');
    } catch (error) {
      console.error('Error submitting comment:', error);
      // Handle error or show error message to the user
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>Author: {post.author}</p>
      <p>Description: {post.description}</p>
      <p>Date Made: {new Date(post.created_at).toLocaleString()}</p>
      <img src={post.imageUrl} alt="Post" style={{ maxWidth: '100%', maxHeight: '300px' }} />

      <form onSubmit={handleSubmitComment}>
        <textarea
          value={commentText}
          onChange={handleCommentChange}
          placeholder="Write your comment..."
          rows="4"
          cols="50"
        ></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>

      <h3>Comments</h3>
      {post.comments && post.comments.map((comment, index) => (
        <div key={index}>{comment}</div>
      ))}
    </div>
  );
};

export default PostDetails;
