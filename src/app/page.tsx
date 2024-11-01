'use client';
import { getAllPosts, PostMetadata } from '@/lib/markdown';
import { BookOpen, Calendar, Rocket, User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [posts, setPosts] = useState<PostMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
      setIsLoading(false);
    }
    loadPosts();
  }, []);

  // Get unique tags from all posts
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  // Filter posts based on selected tag
  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-4">
            Welcome to TapsTechie's Blog
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Where code meets comedy, and bugs meet their match! 🎯
          </p>
          
          {/* Tags Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105
                  ${selectedTag === tag
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/80 text-gray-700 hover:bg-blue-100'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        <div className="space-y-8">
          {filteredPosts.map(post => (
            <article 
              key={post.slug}
              className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="p-6">
                  {/* Post Header */}
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-purple-500" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-green-500" />
                      {post.readTime}
                    </div>
                    <span 
                      className={`px-3 py-1 rounded-full text-sm font-medium
                        ${post.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          post.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}
                    >
                      {post.difficulty}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </h2>
                  
                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Rocket className="h-8 w-8 text-blue-500 animate-bounce" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Stay in the Loop! 🎯
          </h3>
          <p className="text-gray-600 mb-6">
            Subscribe for weekly tech insights, coding tips, and occasional dad jokes! 
            (Warning: Jokes may cause groaning 😄)
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2 rounded-lg border-2 border-transparent focus:border-blue-500 focus:outline-none"
            />
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}