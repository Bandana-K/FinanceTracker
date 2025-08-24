import { useState, useEffect } from 'react';
import { supabase } from './utils/supabase';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import './App.css';

function App() {
  const [session, setSession] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    setSession(supabase.auth.getSession());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="App">
      {!session ? (
        showLogin ? (
          <Login />
        ) : (
          <SignUp />
        )
      ) : (
        <Profile />
      )}
      {!session && (
        <button onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? 'Need to sign up?' : 'Already have an account?'}
        </button>
      )}
    </div>
  );
}

export default App;
