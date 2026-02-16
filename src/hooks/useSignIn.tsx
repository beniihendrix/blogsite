import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/router';

const useSignIn = () => {
  const supabase = createClient();
  const router = useRouter();
  
  const signInWithEmail = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({ 
      email,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    router.push('/');
  };

  return { signInWithEmail, signOut };
};

export default useSignIn;
