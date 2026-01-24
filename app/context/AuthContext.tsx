"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface UserType {
    id: string;
    username: string;
    email: string;
}

interface AuthContextType {
    user: UserType | null;
    login: (user: UserType) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        fetch("/api/auth/me")
        .then((res) => res.json())
        .then((data) => {
            if(data.user) setUser({
                id: data.user._id,
                username: data.user.username,
                email: data.user.email
            });
        });
    }, []);

    const login = (user: UserType) => setUser(user);
    
    const logout = async () => {
        await fetch('/api/auth/logout', {method: "POST"});
        setUser(null);
    };

    return (<AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>);
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context)
        throw new Error("useAuth must be used within AuthProvider");
    
    return context;
}