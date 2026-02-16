import Head from 'next/head';
import Header from '@/components/Header';
import PostList from '@/components/PostList';
import HeaderPublic from '@/components/HeaderPublic';

// --- src/pages/index.tsx ---
const Home = () => {
  return (
    <>
      {/* see previous step */}
      <main>
        <Header />
        <PostList />
      </main>
    </>
  );
};

export default Home;
