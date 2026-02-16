import Link from "next/link";
import { useEffect, useState } from "react";
import { Post } from "@/types/Post";
import PostCard from "./PostCard";
import { createClient } from "@/lib/supabase/client";

// --- src/components/PostList.tsx ---
const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const loadPosts = async () => {
      const {data, error} = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error(error);
        return;
      }

      setPosts(data ?? [] as Post[]);
    }

    loadPosts();
  }, [])
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-90 dark:text-white">
          Latest posts
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
export default PostList;
