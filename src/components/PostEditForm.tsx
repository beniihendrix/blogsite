import { Post } from '@/types/Post';
import { useEffect, useState } from 'react';

type Props = {
  post?: Post;
  saveForm: (title: string, body: string) => Promise<void>;
};
const PostEditForm = ({ saveForm, post }: Props) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await saveForm(title, body);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Title:
        </label>
        <input
          id="title"
          type="text"
          placeholder="Your post title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="body" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Content:
        </label>
        <textarea
          id="body"
          rows={6}
          value={body}
          onChange={({ target }) => setBody(target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        {post ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default PostEditForm;