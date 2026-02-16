import { Post } from '@/types/Post';
import Link from 'next/link';

type Props = {
  post: Post;
};
const PostCard = ({ post }: Props) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {post.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {post.body}
      </p>
      <Link
        href={`/posts/${post.id}`}
        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 font-medium"
      >
        Read more →
      </Link>
    </div>
  );
};

export default PostCard;