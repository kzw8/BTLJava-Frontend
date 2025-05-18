import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Load user từ localStorage khi app khởi chạy
    useEffect(() => {
        const data = localStorage.getItem('nguoiDung');
        if (data) {
            setUser(JSON.parse(data));
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem('nguoiDung', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('nguoiDung');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
