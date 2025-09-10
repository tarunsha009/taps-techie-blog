'use client';
import { getAllPosts, PostMetadata } from '@/lib/markdown';
import { formatTitle } from '@/lib/utils'; // Add this import
import { BookOpen, Calendar, Rocket, User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [posts, setPosts] = useState<PostMetadata[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAllTags, setShowAllTags] = useState(false);

    useEffect(() => {
        async function loadPosts() {
            const allPosts = await getAllPosts();
            setPosts(allPosts);
            setIsLoading(false);
        }
        loadPosts();
    }, []);

    // Get unique tags from all posts
    // const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));
    // Count and sort tags by frequency
    const tagCounts = posts
        .flatMap(post => post.tags)
        .reduce((acc: Record<string, number>, tag) => {
            acc[tag] = (acc[tag] ?? 0) + 1;
            return acc;
        }, {});
    const sortedTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([tag]) => tag);
    const TAG_DISPLAY_LIMIT = 10;
    const displayedTags = showAllTags
        ? sortedTags
        : sortedTags.slice(0, TAG_DISPLAY_LIMIT);

    // Filter posts based on selected tag
    const filteredPosts = selectedTag
        ? posts.filter(post => post.tags.includes(selectedTag))
        : posts;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 py-8 transition-colors duration-300">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Loading...</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 py-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text mb-4">
                        Welcome to TapsTechie's Blog
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 transition-colors duration-300">
                        Where code meets comedy, and bugs meet their match! 🎯
                    </p>

                    {/* Tags Filter */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {/* {allTags.map(tag => ( */}
                        {displayedTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105
                  ${selectedTag === tag
                                        ? 'bg-blue-500 text-white dark:bg-blue-600'
                                        : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/50'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                        {sortedTags.length > TAG_DISPLAY_LIMIT && (
                            <button
                                onClick={() => setShowAllTags(!showAllTags)}
                                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                            >
                                {showAllTags ? 'Show Less' : 'Show More'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Blog Posts */}
                <div className="space-y-8">
                    {filteredPosts.map(post => {
                        const { cleanTitle, emoji } = formatTitle(post.title);

                        return (
                            <article
                                key={post.slug}
                                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                            >
                                <Link href={`/blog/${post.slug}`}>
                                    <div className="p-6">
                                        {/* Post Header */}
                                        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center">
                                                <Calendar className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />
                                                {post.date}
                                            </div>
                                            <div className="flex items-center">
                                                <User className="h-4 w-4 mr-2 text-purple-500 dark:text-purple-400" />
                                                {post.author}
                                            </div>
                                            <div className="flex items-center">
                                                <BookOpen className="h-4 w-4 mr-2 text-green-500 dark:text-green-400" />
                                                {post.readTime}
                                            </div>
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium
                          ${post.difficulty === 'Beginner' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                                                        post.difficulty === 'Intermediate' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                                                            'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'}`}
                                            >
                                                {post.difficulty}
                                            </span>
                                        </div>

                                        {/* Title with proper emoji handling */}
                                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center">
                                            {emoji && <span className="mr-3 text-3xl">{emoji}</span>}
                                            {cleanTitle}
                                        </h2>

                                        {/* Excerpt */}
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
                                            {post.excerpt}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.map(tag => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-full text-sm transition-colors duration-300"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        );
                    })}
                </div>

                {/* Newsletter Section */}
                <div className="mt-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-xl p-8 text-center transition-colors duration-300">
                    <div className="flex items-center justify-center mb-4">
                        <Rocket className="h-8 w-8 text-blue-500 dark:text-blue-400 animate-bounce" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">
                        Stay in the Loop! 🎯
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
                        Subscribe for weekly tech insights, coding tips, and occasional dad jokes!
                        (Warning: Jokes may cause groaning 😄)
                    </p>
                    <div className="max-w-md mx-auto flex gap-4">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="flex-1 px-4 py-2 rounded-lg border-2 border-transparent focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                        />
                        <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-colors duration-300">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}