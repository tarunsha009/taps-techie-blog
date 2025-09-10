// src/lib/markdown.ts - Dynamic GitHub CMS + UTF-8 safe emoji handling

import matter from 'gray-matter';
import hljs from 'highlight.js';
import { marked } from 'marked';
import { githubCMS } from './github'; // keep your dynamic GitHub integration

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
    seoTitle?: string;
    seoDescription?: string;
    datePublished?: string;
    cuid?: string;
    cover?: string;
}

// Configure marked for better rendering
marked.setOptions({
    highlight: function (code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(code, { language: lang }).value;
            } catch (err) {
                console.warn('Highlight.js error:', err);
            }
        }
        return code;
    },
    langPrefix: 'hljs language-',
    breaks: true,
    gfm: true
});

// ---------- UTF-8 helpers ----------
async function safeFetchText(url: string): Promise<string | null> {
    try {
        const res = await fetch(url);
        if (!res.ok) return null;

        const buf = await res.arrayBuffer();
        const text = new TextDecoder('utf-8').decode(new Uint8Array(buf));
        return text.normalize('NFC');
    } catch {
        return null;
    }
}

/**
 * Repair common mojibake (e.g., ðŸ˜…) from Latin-1 mis-decoding
 */
function fixMojibake(s: string): string {
    if (!/[ÃÂ�]|ð|�/.test(s)) return s;

    const bytes = new Uint8Array([...s].map(ch => ch.charCodeAt(0) & 0xff));
    try {
        return new TextDecoder('utf-8', { fatal: false }).decode(bytes).normalize('NFC');
    } catch {
        return s;
    }
}

// ---------- Emoji pass-through (optional map) ----------
function processEmojis(text: string): string {
    const emojiMap: Record<string, string> = {
        '🛡️': '🛡️', '🛳️': '🛳️', '👉': '👉', '✅': '✅', '❌': '❌',
        '🔧': '🔧', '🚀': '🚀', '💡': '💡', '⚡': '⚡', '🎯': '🎯', '📊': '📊',
        '🔍': '🔍', '💻': '💻', '🎉': '🎉', '🏗️': '🏗️', '🔥': '🔥', '💪': '💪',
        '🤖': '🤖', '📚': '📚', '⭐': '⭐', '🌟': '🌟', '😄': '😄', '😉': '😉', '🕺': '🕺'
    };
    let processed = text;
    for (const [emoji, replacement] of Object.entries(emojiMap)) {
        processed = processed.replace(new RegExp(emoji, 'g'), replacement);
    }
    return processed;
}

// ---------- Main functions ----------
export async function getPostBySlug(slug: string) {
    try {
        let markdown: string | null = null;

        // 1) Try GitHub CMS
        try {
            const githubPost = await githubCMS.getPostBySlug(slug);
            if (githubPost?.content) {
                markdown = fixMojibake(String(githubPost.content));
            }
        } catch {
            // ignore and fallback
        }

        // 2) Fallback to local files
        if (!markdown) {
            const attempts = [
                `/content/posts/${slug}.md`,
                `/content/posts/${slug}`,
            ];
            for (const path of attempts) {
                markdown = await safeFetchText(path);
                if (markdown) break;
            }
        }

        if (!markdown) {
            console.error(`Post not found: ${slug}`);
            return null;
        }

        const { data, content } = matter(markdown);

        const normalized = fixMojibake(content);
        const processedContent = processEmojis(normalized);

        const processedData = {
            title: fixMojibake(String(data.title || 'Untitled')),
            date: formatDate(data.date || data.datePublished),
            author: data.author || 'Tarun',
            readTime: data.readTime || calculateReadTime(normalized),
            tags: processTags(data.tags),
            difficulty: data.difficulty || 'Beginner',
            series: data.series,
            excerpt: data.excerpt || data.seoDescription || extractExcerpt(normalized),
            slug,
            seoTitle: data.seoTitle,
            seoDescription: data.seoDescription,
            datePublished: data.datePublished,
            cuid: data.cuid,
            cover: data.cover
        };

        return {
            content: processedContent,
            metadata: processedData as PostMetadata,
        };
    } catch (error) {
        console.error('Error loading post:', error);
        return null;
    }
}

export async function getAllPosts() {
    const allPosts: PostMetadata[] = [];

    // 1) Try GitHub CMS
    try {
        const githubPosts = await githubCMS.getAllPosts();
        if (githubPosts && githubPosts.length > 0) {
            for (const githubPost of githubPosts) {
                if (githubPost?.content && githubPost?.slug) {
                    try {
                        const { data, content } = matter(githubPost.content);
                        const normalized = fixMojibake(content);
                        const processedData = {
                            title: fixMojibake(String(data.title || 'Untitled')),
                            date: formatDate(data.date || data.datePublished),
                            author: data.author || 'Tarun',
                            readTime: data.readTime || calculateReadTime(normalized),
                            tags: processTags(data.tags),
                            difficulty: data.difficulty || 'Beginner',
                            series: data.series,
                            excerpt: data.excerpt || data.seoDescription || extractExcerpt(normalized),
                            slug: githubPost.slug,
                            seoTitle: data.seoTitle,
                            seoDescription: data.seoDescription,
                            datePublished: data.datePublished,
                            cuid: data.cuid,
                            cover: data.cover
                        } as PostMetadata;
                        allPosts.push(processedData);
                    } catch (err) {
                        console.error(`Error parsing GitHub post ${githubPost.slug}:`, err);
                    }
                }
            }
        }
    } catch {
        console.log('GitHub CMS not available, using fallback...');
    }

    // 2) Fallback to local slugs
    if (allPosts.length === 0) {
        const slugs = [
            'event-order',
            'Bulkhead-Pattern',
            'python-magic-methods'
        ];
        const posts = await Promise.all(
            slugs.map(async (slug) => {
                const post = await getPostBySlug(slug);
                return post?.metadata;
            })
        );
        allPosts.push(...posts.filter(Boolean));
    }

    return allPosts.sort((a, b) => {
        const dateA = new Date(a?.datePublished || a?.date || '').getTime();
        const dateB = new Date(b?.datePublished || b?.date || '').getTime();
        return dateB - dateA;
    });
}

// ---------- Helpers ----------
function formatDate(dateString: string | undefined): string {
    if (!dateString) return new Date().toISOString().split('T')[0];
    try {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    } catch {
        return new Date().toISOString().split('T')[0];
    }
}

function processTags(tags: any): string[] {
    if (Array.isArray(tags)) return tags;
    if (typeof tags === 'string') return tags.split(',').map(t => t.trim());
    return [];
}

function calculateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
}

function extractExcerpt(content: string, maxLength: number = 160): string {
    const plainText = content
        .replace(/#{1,6}\s+/g, '')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/`(.*?)`/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/^\s*[-*+]\s+/gm, '')
        .replace(/^\s*\d+\.\s+/gm, '')
        .replace(/\n\s*\n/g, ' ')
        .trim();

    if (plainText.length <= maxLength) return plainText;

    const truncated = plainText.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
}
