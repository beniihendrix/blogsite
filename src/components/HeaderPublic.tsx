import { useState, useEffect } from "react";
import SignupModal from "./SignupModal";
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';


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

  const handleLogout = () => {
    // logout logic will go here
  };
  return (
    <>
      <SignupModal show={showModal} handleClose={() => setShowModal(false)} />
      <nav className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16 relative">
            <a href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Alessandro's Headspace
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
