import Head from 'next/head';
import Link from 'next/link';
import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import Header from '@/components/Header';
import PostEditForm from '@/components/PostEditForm';
import usePosts from '@/hooks/usePosts';
import { Post } from '@/types/Post';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

import { createServerClient } from '@supabase/ssr';
import { parseCookies, setCookie } from 'nookies';
import HeaderPublic from '@/components/HeaderPublic';

type Props = {
  post: Post;
};


const PostPage = ({ post }: Props) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { updatePost } = usePosts();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (title: string, body: string) => {
    await updatePost(post.id, title, body);
    setIsEditing(false);
    router.reload();
  };

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content="Blog post" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <>
          {user ? <Header /> : <HeaderPublic />}
        </>
        <div className="max-w-4xl mx-auto px-3 pt-6">
          <Link href="/">
            <button className="text-white font-semibold py-1 px-2 rounded hover:bg-blue-400">
              ← Back to all posts
            </button>
          </Link>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 whitespace-pre-line">
          {isEditing ? (
            <PostEditForm post={post} saveForm={handleSubmit} />
          ) : (
            <>
              <h1 className="text-3xl text-center font-bold text-gray-900 dark:text-white">{post.title}</h1>
              <div className="mt-4 text-gray-700 text-center dark:text-gray-300">{post.body}</div>
              {user && (
                <div className="mt-4">
                  <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" 
                  onClick={() => setIsEditing(true)}>Edit post</button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default PostPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = parseCookies(ctx);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookies[name];
        },
        set(name, value, options) {
          setCookie(ctx, name, value, options);
        },
        remove(name, options) {
          setCookie(ctx, name, '', { ...options, maxAge: -1 });
        },
      },
    }
  );

  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('id', ctx.params?.id)
    .single();

  if (!data) return { notFound: true };

  return { props: { post: data } };
};
