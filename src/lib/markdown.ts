import matter from 'gray-matter';

export interface PostMetadata {
  title: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  series?: string;
  excerpt: string;
  slug: string;
}

export async function getPostBySlug(slug: string) {
  try {
    const response = await fetch(`/content/posts/${slug}.md`);
    const markdown = await response.text();
    const { data, content } = matter(markdown);

    return {
      content,
      metadata: {
        ...data,
        slug,
      } as PostMetadata,
    };
  } catch (error) {
    console.error('Error loading post:', error);
    return null;
  }
}

export async function getAllPosts() {
  // This is a temporary solution - you'll need to manually maintain this list
  const slugs = [
    'python-magic-methods',
    'test-markdown'
    // Add more slugs as you create more posts
  ];

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug);
      return post?.metadata;
    })
  );

  return posts.filter(Boolean).sort((a, b) => 
    new Date(b?.date || '').getTime() - new Date(a?.date || '').getTime()
  );
}