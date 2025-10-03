import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MarkdownContent from '../components/MarkdownContent';
import { getMarkdownContent, MarkdownPost } from '../utils/markdown';
import { ArrowLeft } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<MarkdownPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const content = await getMarkdownContent(`/content/blog/${slug}.md`);
        if (content) {
          setPost(content);
          setError(null);
        } else {
          setError('Article non trouvé');
        }
      } catch (err) {
        setError('Erreur lors du chargement de l\'article');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-offWhite pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-600">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-offWhite pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-4xl font-playfair text-raspberry mb-4">
              Article non trouvé
            </h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link to="/blog" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour au blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offWhite pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-raspberry hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au blog
        </Link>

        {post.frontMatter.featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={post.frontMatter.featuredImage}
              alt={post.frontMatter.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        )}

        <article className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">
                {new Date(post.frontMatter.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              {post.frontMatter.author && (
                <span className="text-sm text-raspberry font-medium">
                  Par {post.frontMatter.author}
                </span>
              )}
            </div>

            {post.frontMatter.tags && post.frontMatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.frontMatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 bg-gold/20 text-gray-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <MarkdownContent content={post.content} />
        </article>

        <div className="mt-8 text-center">
          <Link to="/blog" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voir tous les articles
          </Link>
        </div>
      </div>
    </div>
  );
}
