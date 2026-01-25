import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '@/components/Header';
import PostList from '@/components/PostList';

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
