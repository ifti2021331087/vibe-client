import React, { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import useAxiosPublic from '../Hooks/useAxiosPublic';


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext=createContext(null);
const auth=getAuth(app);
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const axiosPublic=useAxiosPublic();

    const createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const signIn=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    const logOut=()=>{
        setLoading(true);
        return signOut(auth);
    }
    const updateUserProfile=(name,photo)=>{
        return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL:photo
        });
    }
    // useEffect(()=>{
    //     const unsubscribe=onAuthStateChanged(auth,currentUser=>{
    //         setUser(currentUser);
    //         if(currentUser){
    //             const user_info={email:currentUser.email};
    //             axiosPublic.post('jwt',user_info)
    //             .then(res=>{
    //                 localStorage.setItem('access-token',res.data.token);
    //             })
    //         }
    //         else localStorage.removeItem('access-token');
    //         setLoading(false);
    //     })
    //     return ()=>{
    //         unsubscribe();
    //     }
    // })
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            
            if (currentUser) {
                // Get token and set cookie via backend
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.success) {
                            console.log("Cookie set successfully");
                            setLoading(false);
                        }
                    })
                    .catch(err => {
                        console.error("JWT Error:", err);
                        setLoading(false);
                    });
            } else {
                // Clear the cookie on logout
                axiosPublic.post('/logout')
                    .then(() => {
                        console.log("Cookie cleared");
                        setLoading(false);
                    });
            }
        });

        return () => {
            return unsubscribe();
        };
    }, [axiosPublic]);

    const authInfo={
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
    }

    return (
       <AuthContext.Provider value={authInfo}>
            {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;