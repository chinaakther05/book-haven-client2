import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/Firebase.init';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser);
      }) 
      return () => {
        unsubscribe()
      }
    }, [])

    const authInfo = {
        createUser,
        user,
        loading

    }

    return (
        <AuthContext value={authInfo}>
           {children}
        </AuthContext>
    );
};

export default AuthProvider;