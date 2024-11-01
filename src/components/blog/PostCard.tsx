import { Calendar, Tag, User } from 'lucide-react';

interface PostCardProps {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
}

const PostCard = ({ title, date, excerpt, category, tags, author }: PostCardProps) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            {date}
          </div>
          <div className="flex items-center text-gray-500">
            <User className="h-4 w-4 mr-2" />
            {author}
          </div>
          <div className="flex items-center text-gray-500">
            <Tag className="h-4 w-4 mr-2" />
            {category}
          </div>
        </div>
        
        <h3 className="text-2xl font-semibold text-gray-800 mb-3 hover:text-blue-500 transition-colors duration-200">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4">
          {excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default PostCard;