import matter from 'gray-matter';

export interface MarkdownPost {
  slug: string;
  frontMatter: {
    title: string;
    date: string;
    author?: string;
    featuredImage?: string;
    excerpt?: string;
    description?: string;
    image?: string;
    tags?: string[];
    [key: string]: unknown;
  };
  content: string;
}

export async function getMarkdownContent(path: string): Promise<MarkdownPost | null> {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to fetch markdown from ${path}`);
    }
    const text = await response.text();
    const { data, content } = matter(text);

    const slug = path.split('/').pop()?.replace('.md', '') || '';

    return {
      slug,
      frontMatter: data as MarkdownPost['frontMatter'],
      content
    };
  } catch (error) {
    console.error('Error fetching markdown:', error);
    return null;
  }
}

export async function getAllMarkdownFiles(
  folder: 'pages' | 'blog'
): Promise<MarkdownPost[]> {
  const fileMap: Record<string, string[]> = {
    pages: ['about.md', 'contact.md'],
    blog: [
      '2024-01-20-huiles-essentielles-cheveux.md',
      '2024-02-05-routine-capillaire-naturelle.md',
      '2024-02-15-bienfaits-huile-argan.md'
    ]
  };

  const files = fileMap[folder] || [];
  const posts: MarkdownPost[] = [];

  for (const file of files) {
    const post = await getMarkdownContent(`/content/${folder}/${file}`);
    if (post) {
      posts.push(post);
    }
  }

  if (folder === 'blog') {
    posts.sort((a, b) => {
      const dateA = new Date(a.frontMatter.date).getTime();
      const dateB = new Date(b.frontMatter.date).getTime();
      return dateB - dateA;
    });
  }

  return posts;
}
