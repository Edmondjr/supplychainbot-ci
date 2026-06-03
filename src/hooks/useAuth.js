import { useState } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import { useAuthContext } from '../context/AuthContext';

export function useAuth() {
  const { user, loading } = useAuthContext();
  const [authError, setAuthError] = useState(null);

  async function loginWithGoogle() {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setAuthError(err.message);
    }
  }

  async function logout() {
    try {
      await signOut(auth);
    } catch (err) {
      setAuthError(err.message);
    }
  }

  return { user, loading, authError, loginWithGoogle, logout };
}
