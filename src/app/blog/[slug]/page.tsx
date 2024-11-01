'use client';
import { getPostBySlug, PostMetadata } from '@/lib/markdown';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { Bookmark, BookOpen, Calendar, Coffee, Heart, Share2, User } from 'lucide-react';
import { marked } from 'marked';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './styles.css';

// Configure marked
marked.setOptions({
  highlight: function(code, lang) {
    const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  breaks: true,
  gfm: true
});

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [post, setPost] = useState<{ content: string; metadata: PostMetadata } | null>(null);

  useEffect(() => {
    async function loadPost() {
      const postData = await getPostBySlug(params.slug);
      if (postData) {
        setPost(postData);
      }
    }
    loadPost();
  }, [params.slug]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-blue-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Navigation */}
        <Link 
          href="/"
          className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-8 group"
        >
          <svg 
            className="w-5 h-5 mr-2 transform transition-transform group-hover:-translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        {/* Article */}
        <article className="bg-white/80 backdrop-blur-lg rounded-xl shadow-xl p-8">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {post.metadata.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                {post.metadata.date}
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-purple-500" />
                {post.metadata.author}
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-green-500" />
                {post.metadata.readTime}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.metadata.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-p:text-gray-600 prose-code:text-blue-600">
            <div 
              className="markdown-content"
              dangerouslySetInnerHTML={{ __html: marked(post.content) }} 
            />
          </div>

          {/* Actions Bar */}
          <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors
                  ${isLiked ? 'text-red-500 bg-red-50' : 'text-gray-500 hover:text-red-500'}`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>Like</span>
              </button>

              <div className="relative">
                <button 
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>

                {showShareMenu && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {['Twitter', 'LinkedIn', 'Facebook'].map((platform) => (
                        <button
                          key={platform}
                          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Share on {platform}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors
                  ${isBookmarked ? 'text-yellow-500 bg-yellow-50' : 'text-gray-500 hover:text-yellow-500'}`}
              >
                <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                <span>Save</span>
              </button>
            </div>

            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
              <Coffee className="h-5 w-5" />
              <span>Buy me a coffee</span>
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}