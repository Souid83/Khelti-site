import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllMarkdownFiles, MarkdownPost } from '../utils/markdown';

export default function Blog() {
  const [posts, setPosts] = useState<MarkdownPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const blogPosts = await getAllMarkdownFiles('blog');
        console.log('Loaded posts:', blogPosts);
        setPosts(blogPosts);
      } catch (err) {
        console.error('Error loading blog posts:', err);
        setError('Impossible de charger les articles du blog. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-offWhite pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-600">Chargement des articles...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-offWhite pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-offWhite pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-playfair text-raspberry mb-4">
              Notre Blog
            </h1>
            <p className="text-lg font-lora text-gray-600">
              Conseils, recettes et astuces pour des soins naturels
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-600">Aucun article disponible pour le moment.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offWhite pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair text-raspberry mb-4">
            Notre Blog
          </h1>
          <p className="text-lg font-lora text-gray-600">
            Conseils, recettes et astuces pour des soins naturels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="card bg-white hover:shadow-xl transition-shadow"
            >
              {post.frontMatter.featuredImage && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.frontMatter.featuredImage}
                    alt={post.frontMatter.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">
                    {new Date(post.frontMatter.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  {post.frontMatter.author && (
                    <span className="text-sm text-raspberry">
                      {post.frontMatter.author}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-playfair text-raspberry mb-3">
                  {post.frontMatter.title}
                </h2>
                {post.frontMatter.excerpt && (
                  <p className="text-gray-600 font-lora text-sm line-clamp-3">
                    {post.frontMatter.excerpt}
                  </p>
                )}
                {post.frontMatter.tags && post.frontMatter.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.frontMatter.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-gold/20 text-gray-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
