import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-4xl md:text-5xl font-playfair text-raspberry mb-6 mt-8">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl md:text-4xl font-playfair text-raspberry mb-4 mt-8">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl md:text-3xl font-playfair text-raspberry mb-3 mt-6">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xl font-playfair text-raspberry mb-2 mt-4">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="font-lora text-gray-700 mb-4 leading-relaxed">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="font-lora text-gray-700 mb-4 ml-6 list-disc">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="font-lora text-gray-700 mb-4 ml-6 list-decimal">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="mb-2">{children}</li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-raspberry hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gold pl-4 italic text-gray-600 my-4">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-raspberry">
              {children}
            </strong>
          ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="rounded-lg my-6 w-full object-cover"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
