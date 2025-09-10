import matter from 'gray-matter';
import { githubCMS } from './github';

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

// Fallback for local development or if GitHub API fails
const LOCAL_POSTS = [
    'python-magic-methods',
    'test-markdown'
];

export async function getPostBySlug(slug: string) {
    try {
        // Try GitHub first
        const githubPost = await githubCMS.getPostBySlug(slug);
        if (githubPost) {
            const { data, content } = matter(githubPost.content);
            return {
                content,
                metadata: {
                    ...data,
                    slug,
                } as PostMetadata,
            };
        }

        // Fallback to local files
        const response = await fetch(`/content/posts/${slug}.md`);
        if (response.ok) {
            const markdown = await response.text();
            const { data, content } = matter(markdown);
            return {
                content,
                metadata: {
                    ...data,
                    slug,
                } as PostMetadata,
            };
        }

        return null;
    } catch (error) {
        console.error('Error loading post:', error);

        // Final fallback to local
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
        } catch (localError) {
            console.error('Local fallback failed:', localError);
            return null;
        }
    }
}

export async function getAllPosts(): Promise<PostMetadata[]> {
    try {
        // Try GitHub first
        const githubPosts = await githubCMS.getAllPosts();

        if (githubPosts.length > 0) {
            const posts = await Promise.all(
                githubPosts.map(async (post) => {
                    if (!post) return null;

                    try {
                        const { data } = matter(post.content);
                        return {
                            ...data,
                            slug: post.slug,
                        } as PostMetadata;
                    } catch (error) {
                        console.error(`Error parsing post ${post.slug}:`, error);
                        return null;
                    }
                })
            );

            const validPosts = posts.filter(Boolean);
            return validPosts.sort((a, b) =>
                new Date(b?.date || '').getTime() - new Date(a?.date || '').getTime()
            );
        }

        // Fallback to local posts
        console.log('Falling back to local posts');
        const posts = await Promise.all(
            LOCAL_POSTS.map(async (slug) => {
                const post = await getPostBySlug(slug);
                return post?.metadata;
            })
        );

        return posts.filter(Boolean).sort((a, b) =>
            new Date(b?.date || '').getTime() - new Date(a?.date || '').getTime()
        );
    } catch (error) {
        console.error('Error loading posts:', error);

        // Final fallback
        const posts = await Promise.all(
            LOCAL_POSTS.map(async (slug) => {
                const post = await getPostBySlug(slug);
                return post?.metadata;
            })
        );

        return posts.filter(Boolean).sort((a, b) =>
            new Date(b?.date || '').getTime() - new Date(a?.date || '').getTime()
        );
    }
}

// Helper function to validate post metadata
export function validatePostMetadata(data: any): data is PostMetadata {
    return (
        typeof data.title === 'string' &&
        typeof data.date === 'string' &&
        typeof data.author === 'string' &&
        typeof data.readTime === 'string' &&
        Array.isArray(data.tags) &&
        ['Beginner', 'Intermediate', 'Advanced'].includes(data.difficulty) &&
        typeof data.excerpt === 'string'
    );
}

// Cache for better performance
let postsCache: { posts: PostMetadata[]; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getAllPostsCached(): Promise<PostMetadata[]> {
    const now = Date.now();

    if (postsCache && (now - postsCache.timestamp) < CACHE_DURATION) {
        return postsCache.posts;
    }

    const posts = await getAllPosts();
    postsCache = { posts, timestamp: now };

    return posts;
}