import { useState, useEffect } from "react";
import { Navbar, Button, Container } from "react-bootstrap";
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
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">My Supabase blog</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {user ? (
              <Button variant="link" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button onClick={() => setShowModal(true)}>Login</Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
