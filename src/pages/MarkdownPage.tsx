import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MarkdownContent from '../components/MarkdownContent';
import { getMarkdownContent, MarkdownPost } from '../utils/markdown';

export default function MarkdownPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<MarkdownPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const content = await getMarkdownContent(`/content/pages/${slug}.md`);
        if (content) {
          setPost(content);
          setError(null);
        } else {
          setError('Page non trouvée');
        }
      } catch (err) {
        setError('Erreur lors du chargement de la page');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
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
              Page non trouvée
            </h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offWhite pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {post.frontMatter.image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={post.frontMatter.image}
              alt={post.frontMatter.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        )}

        <article className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <MarkdownContent content={post.content} />
        </article>
      </div>
    </div>
  );
}
