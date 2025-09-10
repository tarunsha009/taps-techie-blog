'use client';
import { getAllPosts, PostMetadata } from '@/lib/markdown';
import { formatTitle } from '@/lib/utils'; // Add this import
import { Calendar, Edit, ExternalLink, FileText, Github, PlusCircle, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
    const [posts, setPosts] = useState<PostMetadata[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

    const loadPosts = async () => {
        setIsLoading(true);
        try {
            const allPosts = await getAllPosts();
            setPosts(allPosts);
            setLastRefresh(new Date());
        } catch (error) {
            console.error('Error loading posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const createNewPostUrl = () => {
        const repoUrl = 'https://github.com/tarunsha009/taps-techie-blog';
        const newFileUrl = `${repoUrl}/new/main/public/content/posts`;
        return newFileUrl;
    };

    const editPostUrl = (slug: string) => {
        const repoUrl = 'https://github.com/tarunsha009/taps-techie-blog';
        const editUrl = `${repoUrl}/edit/main/public/content/posts/${slug}.md`;
        return editUrl;
    };

    const getNewPostTemplate = () => {
        const today = new Date().toISOString().split('T')[0];
        return `---
title: "🚀 Your Awesome Blog Post Title"
date: "${today}"
author: "Tarun"
readTime: "5 min"
tags: ["tag1", "tag2", "tag3"]
difficulty: "Beginner"
series: "Optional Series Name"
excerpt: "A compelling excerpt that makes people want to read more..."
---

# Your Blog Post Title

Write your amazing content here using Markdown!

## Section 1

Your content...

## Section 2

More awesome content...

\`\`\`python
# Code examples work great!
def hello_world():
    print("Hello from TapsTechie!")
\`\`\`

## Conclusion

Wrap up your post nicely!
`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 py-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                                📝 Blog Admin Dashboard
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Manage your blog posts directly from GitHub
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                            <button
                                onClick={loadPosts}
                                disabled={isLoading}
                                className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg transition-colors duration-200"
                            >
                                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                                Refresh Posts
                            </button>

                            <a
                                href={createNewPostUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
                            >
                                <PlusCircle className="h-4 w-4 mr-2" />
                                New Post
                                <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                        </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        Last refreshed: {lastRefresh.toLocaleTimeString()}
                    </div>
                </div>

                {/* Instructions */}
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                        <Github className="h-5 w-5 mr-2" />
                        How to Add New Posts
                    </h2>

                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                            <div className="font-semibold text-gray-800 dark:text-white mb-2">1. Create New File</div>
                            <p className="text-gray-600 dark:text-gray-300">
                                Click "New Post" to open GitHub. Create a new .md file in the posts folder.
                            </p>
                        </div>

                        <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                            <div className="font-semibold text-gray-800 dark:text-white mb-2">2. Use Template</div>
                            <p className="text-gray-600 dark:text-gray-300">
                                Copy the frontmatter template below and fill in your content.
                            </p>
                        </div>

                        <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                            <div className="font-semibold text-gray-800 dark:text-white mb-2">3. Commit & See</div>
                            <p className="text-gray-600 dark:text-gray-300">
                                Commit the file and your post appears automatically!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Template */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        New Post Template
                    </h3>

                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-green-400 text-sm">
                            <code>{getNewPostTemplate()}</code>
                        </pre>
                    </div>

                    <button
                        onClick={() => navigator.clipboard.writeText(getNewPostTemplate())}
                        className="mt-4 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                    >
                        Copy Template
                    </button>
                </div>

                {/* Posts List */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        Your Blog Posts ({posts.length})
                    </h3>

                    {isLoading ? (
                        <div className="text-center py-8">
                            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-500 mb-2" />
                            <p className="text-gray-600 dark:text-gray-300">Loading posts...</p>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-8">
                            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-600 dark:text-gray-300 mb-4">No posts found</p>
                            <a
                                href={createNewPostUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
                            >
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Create Your First Post
                            </a>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {posts.map((post) => {
                                const { cleanTitle, emoji } = formatTitle(post.title);

                                return (
                                    <div key={post.slug} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
                                                    {emoji && <span className="mr-2 text-xl">{emoji}</span>}
                                                    {cleanTitle}
                                                </h4>

                                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                    <div className="flex items-center">
                                                        <Calendar className="h-4 w-4 mr-1" />
                                                        {post.date}
                                                    </div>
                                                    <div>By {post.author}</div>
                                                    <div>{post.readTime}</div>
                                                    <span className={`px-2 py-1 rounded-full text-xs
                            ${post.difficulty === 'Beginner' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                                                            post.difficulty === 'Intermediate' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                                                                'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'}`}
                                                    >
                                                        {post.difficulty}
                                                    </span>
                                                </div>

                                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                                    {post.excerpt}
                                                </p>

                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {post.tags.map(tag => (
                                                        <span key={tag} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded text-xs">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex gap-2 mt-4 md:mt-0 md:ml-4">
                                                <a
                                                    href={`/blog/${post.slug}`}
                                                    className="flex items-center px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors duration-200"
                                                >
                                                    View
                                                </a>
                                                <a
                                                    href={editPostUrl(post.slug)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors duration-200"
                                                >
                                                    <Edit className="h-3 w-3 mr-1" />
                                                    Edit
                                                    <ExternalLink className="h-3 w-3 ml-1" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}