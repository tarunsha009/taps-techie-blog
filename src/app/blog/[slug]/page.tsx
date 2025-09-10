// src/app/blog/[slug]/page.tsx - Updated with dark mode support
'use client';
import { getPostBySlug, PostMetadata } from '@/lib/markdown';
import 'highlight.js/styles/github-dark.css';
import {
    ArrowLeft,
    Bookmark,
    BookOpen,
    Calendar,
    Clock,
    Coffee,
    ExternalLink,
    Heart,
    Share2,
    Tag,
    User
} from 'lucide-react';
import { marked } from 'marked';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './styles.css';

interface BlogPostProps {
    params: Promise<{ slug: string }> | { slug: string };
}

export default function BlogPost({ params }: BlogPostProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [readingTime, setReadingTime] = useState(0);
    const [post, setPost] = useState<{ content: string; metadata: PostMetadata } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [slug, setSlug] = useState<string>('');

    // Handle both Promise and direct params
    useEffect(() => {
        async function getSlug() {
            if ('then' in params) {
                const resolvedParams = await params;
                setSlug(resolvedParams.slug);
            } else {
                setSlug(params.slug);
            }
        }
        getSlug();
    }, [params]);

    useEffect(() => {
        if (!slug) return;

        async function loadPost() {
            try {
                const postData = await getPostBySlug(slug);
                if (postData) {
                    setPost(postData);
                    // Calculate actual reading time based on content
                    const wordsPerMinute = 200;
                    const words = postData.content.split(/\s+/).length;
                    setReadingTime(Math.ceil(words / wordsPerMinute));
                }
            } catch (error) {
                console.error('Error loading post:', error);
            } finally {
                setIsLoading(false);
            }
        }
        loadPost();
    }, [slug]);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(Math.min(progress, 100));
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const sharePost = (platform: string) => {
        const url = window.location.href;
        const title = post?.metadata.title || '';
        const shareUrls = {
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        };

        if (shareUrls[platform as keyof typeof shareUrls]) {
            window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
        }
        setShowShareMenu(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 py-8 transition-colors duration-300">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-xl p-8 transition-colors duration-300">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-6"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-4/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 py-8 transition-colors duration-300">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">Post Not Found</h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300">The blog post you're looking for doesn't exist.</p>
                    <Link
                        href="/"
                        className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 py-8 transition-colors duration-300">
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-50 transition-colors duration-300">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 transition-all duration-150"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            <div className="max-w-4xl mx-auto px-4">
                {/* Navigation */}
                <Link
                    href="/"
                    className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 mb-8 group transition-all duration-200"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 transform transition-transform group-hover:-translate-x-1" />
                    Back to Blog
                </Link>

                {/* Article */}
                <article className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden transition-colors duration-300">
                    {/* Cover Image */}
                    {post.metadata.cover && (
                        <div className="h-64 md:h-80 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 relative overflow-hidden">
                            <img
                                src={post.metadata.cover}
                                alt={post.metadata.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-20 dark:bg-opacity-40"></div>
                        </div>
                    )}

                    <div className="p-8">
                        {/* Header */}
                        <header className="mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 leading-tight transition-colors duration-300">
                                {post.metadata.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
                                <div className="flex items-center">
                                    <Calendar className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
                                    <span>{new Date(post.metadata.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</span>
                                </div>
                                <div className="flex items-center">
                                    <User className="h-5 w-5 mr-2 text-purple-500 dark:text-purple-400" />
                                    <span>{post.metadata.author}</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="h-5 w-5 mr-2 text-green-500 dark:text-green-400" />
                                    <span>{readingTime} min read</span>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300
                    ${post.metadata.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                            post.metadata.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}
                                >
                                    {post.metadata.difficulty}
                                </span>
                            </div>

                            {/* Series Info */}
                            {post.metadata.series && (
                                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4 mb-6 transition-colors duration-300">
                                    <p className="text-blue-700 dark:text-blue-300">
                                        <strong>Part of series:</strong> {post.metadata.series}
                                    </p>
                                </div>
                            )}

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {post.metadata.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors cursor-pointer"
                                    >
                                        <Tag className="w-3 h-3 mr-1" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </header>

                        {/* Content */}
                        <div className="prose prose-lg max-w-none prose-headings:text-gray-800 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-pre:bg-gray-900 transition-colors duration-300">
                            <div
                                className="markdown-content dark:text-gray-300"
                                dangerouslySetInnerHTML={{ __html: marked(post.content) }}
                            />
                        </div>

                        {/* SEO Links */}
                        {post.metadata.seoDescription && (
                            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-colors duration-300">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2 transition-colors duration-300">About this article:</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">{post.metadata.seoDescription}</p>
                            </div>
                        )}

                        {/* Actions Bar */}
                        <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200 dark:border-gray-600 transition-colors duration-300">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setIsLiked(!isLiked)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 transform hover:scale-105
                    ${isLiked ? 'text-red-500 bg-red-50 dark:bg-red-900/20 shadow-md' : 'text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'}`}
                                >
                                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                                    <span className="font-medium">Like</span>
                                </button>

                                <div className="relative">
                                    <button
                                        onClick={() => setShowShareMenu(!showShareMenu)}
                                        className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 transform hover:scale-105"
                                    >
                                        <Share2 className="h-5 w-5" />
                                        <span className="font-medium">Share</span>
                                    </button>

                                    {showShareMenu && (
                                        <div className="absolute left-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 dark:ring-gray-600 z-10 transition-colors duration-300">
                                            <div className="py-1">
                                                {[
                                                    { name: 'Twitter', platform: 'twitter' },
                                                    { name: 'LinkedIn', platform: 'linkedin' },
                                                    { name: 'Facebook', platform: 'facebook' }
                                                ].map((social) => (
                                                    <button
                                                        key={social.platform}
                                                        onClick={() => sharePost(social.platform)}
                                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                                    >
                                                        <ExternalLink className="w-4 h-4 mr-2" />
                                                        Share on {social.name}
                                                    </button>
                                                ))}
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(window.location.href);
                                                        setShowShareMenu(false);
                                                    }}
                                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                                >
                                                    <BookOpen className="w-4 h-4 mr-2" />
                                                    Copy Link
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => setIsBookmarked(!isBookmarked)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 transform hover:scale-105
                    ${isBookmarked ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 shadow-md' : 'text-gray-500 dark:text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'}`}
                                >
                                    <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                                    <span className="font-medium">Save</span>
                                </button>
                            </div>

                            <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-700 dark:hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                                <Coffee className="h-5 w-5" />
                                <span className="font-medium">Buy me a coffee</span>
                            </button>
                        </div>

                        {/* Related Posts Section */}
                        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-600 transition-colors duration-300">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">Related Posts</h3>
                            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">More awesome content coming soon! 🚀</p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}