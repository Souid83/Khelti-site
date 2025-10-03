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

function parseFrontMatter(text: string): { data: Record<string, unknown>; content: string } {
  const frontMatterRegex = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/;
  const match = text.match(frontMatterRegex);

  if (!match) {
    console.log('No frontmatter found in text');
    return { data: {}, content: text };
  }

  const frontMatterText = match[1];
  const content = match[2];
  const data: Record<string, unknown> = {};

  console.log('Parsing frontmatter:', frontMatterText);

  const lines = frontMatterText.split(/\r?\n/);
  let currentKey = '';
  let currentValue: string | string[] = '';
  let isArray = false;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) continue;

    if (trimmedLine.startsWith('-')) {
      if (isArray && Array.isArray(currentValue)) {
        currentValue.push(trimmedLine.substring(1).trim());
      }
    } else if (line.includes(':')) {
      if (currentKey && currentValue !== '') {
        data[currentKey] = isArray ? currentValue : currentValue;
      }

      const colonIndex = line.indexOf(':');
      currentKey = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();

      if (value === '') {
        isArray = true;
        currentValue = [];
      } else {
        isArray = false;
        currentValue = value;
      }
    }
  }

  if (currentKey && currentValue !== '') {
    data[currentKey] = isArray ? currentValue : currentValue;
  }

  console.log('Parsed frontmatter data:', data);

  return { data, content };
}

export async function getMarkdownContent(path: string): Promise<MarkdownPost | null> {
  try {
    console.log('Fetching markdown from:', path);
    const response = await fetch(path);
    if (!response.ok) {
      console.error(`Failed to fetch markdown from ${path}, status: ${response.status}`);
      throw new Error(`Failed to fetch markdown from ${path}`);
    }
    const text = await response.text();
    console.log('Markdown text length:', text.length);
    const { data, content } = parseFrontMatter(text);

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
    pages: ['a-propos.md', 'contact.md'],
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
