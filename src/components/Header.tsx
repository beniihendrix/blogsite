import { useState, useEffect } from "react";
import SignupModal from "./SignupModal";
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import useSignIn from "@/hooks/useSignIn";


// --- src/components/Header.tsx ---
const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

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

  const { signOut } = useSignIn();
  return (
    <>
      <SignupModal show={showModal} handleClose={() => setShowModal(false)} />
      <nav className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16 relative">
            <a href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Benicio's Headspace
            </a>
            <div className="absolute right-0 flex items-center gap-4">
              {user ? (
                <button
                  onClick={signOut}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 font-medium"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
