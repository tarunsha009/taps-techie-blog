// src/lib/markdown.ts - Updated with simple emoji support

import matter from 'gray-matter';
import hljs from 'highlight.js';
import { marked } from 'marked';

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

// Simple emoji processing function
function processEmojis(text: string): string {
    // Common emoji mappings that might not render properly
    const emojiMap: Record<string, string> = {
        '🛡️': '🛡️',
        '🛳️': '🛳️',
        '👉': '👉',
        '✅': '✅',
        '❌': '❌',
        '🔧': '🔧',
        '🚀': '🚀',
        '💡': '💡',
        '⚡': '⚡',
        '🎯': '🎯',
        '📊': '📊',
        '🔍': '🔍',
        '💻': '💻',
        '🎉': '🎉',
        '🏗️': '🏗️',
        '🔥': '🔥',
        '💪': '💪',
        '🤖': '🤖',
        '📚': '📚',
        '⭐': '⭐',
        '🌟': '🌟',
        '😄': '😄',
        '😉': '😉',
        '🕺': '🕺'
    };

    let processed = text;
    Object.entries(emojiMap).forEach(([emoji, replacement]) => {
        processed = processed.replace(new RegExp(emoji, 'g'), replacement);
    });

    return processed;
}

export async function getPostBySlug(slug: string) {
    try {
        // Try different file extensions and paths
        let response;
        let markdown;

        const attempts = [
            `/content/posts/${slug}.md`,
            `/content/posts/${slug}`,
        ];

        for (const path of attempts) {
            try {
                response = await fetch(path);
                if (response.ok) {
                    markdown = await response.text();
                    break;
                }
            } catch {
                continue;
            }
        }

        if (!markdown) {
            console.error(`Post not found: ${slug}`);
            return null;
        }

        const { data, content } = matter(markdown);

        // Process content for better rendering
        const processedContent = processEmojis(content);

        // Enhanced metadata processing to handle your GitHub CMS format
        const processedData = {
            title: data.title || 'Untitled',
            date: formatDate(data.date || data.datePublished),
            author: data.author || 'Tarun',
            readTime: data.readTime || calculateReadTime(content),
            tags: processTags(data.tags),
            difficulty: data.difficulty || 'Beginner',
            series: data.series,
            excerpt: data.excerpt || data.seoDescription || extractExcerpt(content),
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
    // Updated with your new post
    const slugs = [
        'Bulkhead-Pattern', // Your new GitHub CMS post
        'python-magic-methods',
        'test-markdown'
    ];

    const posts = await Promise.all(
        slugs.map(async (slug) => {
            const post = await getPostBySlug(slug);
            return post?.metadata;
        })
    );

    return posts.filter(Boolean).sort((a, b) => {
        const dateA = new Date(a?.datePublished || a?.date || '').getTime();
        const dateB = new Date(b?.datePublished || b?.date || '').getTime();
        return dateB - dateA;
    });
}

// Helper functions
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