import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import MarkdownPage from './pages/MarkdownPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-offWhite">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/boutique" element={<Shop />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/a-propos" element={<MarkdownPage />} />
            <Route path="/contact" element={<MarkdownPage />} />
            <Route path="/:slug" element={<MarkdownPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;