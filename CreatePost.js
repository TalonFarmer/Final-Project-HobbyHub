import React, { useState } from 'react';
import './CreatePost.css';
import { supabase } from '../client';

const CreatePost = () => {
  const [post, setPost] = useState({ title: "", author: "", description: "", imageUrl: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createPost = async (event) => {
    event.preventDefault();
    await supabase.from('Posts').insert(post);
    window.location = "/";
  };

  return (
    <div>
      <form>
        <label htmlFor="title">Title</label> <br />
        <input type="text" id="title" name="title" onChange={handleChange} /><br />
        <br/>

        <label htmlFor="author">Author</label><br />
        <input type="text" id="author" name="author" onChange={handleChange} /><br />
        <br/>

        <label htmlFor="description">Description</label><br />
        <textarea rows="5" cols="50" id="description" name="description" onChange={handleChange}></textarea>
        <br/>

        <label htmlFor="imageUrl">Image URL</label><br />
        <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange} /><br />
        <br/>

        {post.imageUrl && ( // Render the image only if imageUrl is provided
          <img src={post.imageUrl} alt="Post Image" style={{ maxWidth: "100%", maxHeight: "300px" }} />
        )}

        <input type="submit" value="Submit" onClick={createPost} />
      </form>
    </div>
  );
};

export default CreatePost;
