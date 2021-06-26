import firebase from './firebase';
import { createUser } from './db';
import { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';


const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext)

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);
      setUser(user);
      cookie.set('firebase-auth', true, {
        expires: 1
      });

      setLoading(false)
      return user;
    } else {
      setUser(false)
      cookie.remove('firebase-auth');

      setLoading(false);
      return false;
    }
  };

  const createWithEmail = (email, password) => {
    setLoading(true);
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((response) => handleUser(response.user))
  }

  const signinWithEmail = (email, password) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        handleUser(response.user);
        Router.push('/');
      });
  };

  const signout = () => {
    Router.push('/login');

    return firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser(false)
        Router.push('/login')
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signinWithEmail,
    createWithEmail,
    signout
  };
}

const formatUser = async (user) => {
  const token = await user.getIdToken();
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token
  };
};