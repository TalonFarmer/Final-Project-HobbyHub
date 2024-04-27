import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ReadPosts from './pages/ReadPosts';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostDetails from './pages/PostDetail'; // New component for displaying individual post details

const App = () => {
  const descr =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';

  const posts = [];

  // Sets up routes
  let element = useRoutes([
    {
      path: '/',
      element: <ReadPosts data={posts} />,
    },
    {
      path: '/edit/:id',
      element: <EditPost data={posts} />,
    },
    {
      path: '/new',
      element: <CreatePost />,
    },
    // Route for individual post pages
    {
      path: '/post/:id',
      element: <PostDetails data={posts} />,
    },
  ]);

  return (
    <div className="App">
      <div className="header">
        <h1>🕹️GameCube FanHub</h1>
        <Link to="/">
          <button className="headerBtn"> Explore Posts 🔍 </button>
        </Link>
        <Link to="/new">
          <button className="headerBtn"> Create a Post 📃 </button>
        </Link>
      </div>
      {element}
    </div>
  );
};

export default App;
