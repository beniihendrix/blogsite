import { createClient } from '@/lib/supabase/client';

const useSignIn = () => {
  const supabase = createClient();
  
  const signInWithEmail = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({ 
        email:email, 
    })
    if (error) throw error;
  };

  const signOut = async () => {
    const {error} = await supabase.auth.signOut();
    if (error) throw error;
  };

  return {signInWithEmail, signOut};
};

export default useSignIn;