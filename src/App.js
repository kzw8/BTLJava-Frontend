// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './components/NguoiDung/NguoiDungContext';
import Navbar    from './components/Layout/Navbar';
import Sidebar   from './components/Layout/Sidebar';
import Footer    from './components/Layout/Footer';

import Home        from './pages/Home';
import Transaction from './pages/GiaoDich';
import DangNhap    from './pages/DangNhap';
import DangKy      from './pages/DangKy';
import BaoCaoChiTieu from './pages/BaoCaoChiTieu';

         // CSS chung cho layout
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <AuthProvider>
            <div className={`app-grid ${darkMode ? 'dark' : ''}`}>
                <Router>
                    <header className="app-header">
                        <Navbar />
                    </header>

                    <aside className="app-sidebar">
                        <Sidebar onToggleTheme={() => setDarkMode(d => !d)} />
                    </aside>

                    <main className="app-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/transactions" element={<Transaction />} />
                            <Route path="/DangNhap"   element={<DangNhap />} />
                            <Route path="/DangKy"     element={<DangKy />} />
                            <Route path="/reports/category"           element={<BaoCaoChiTieu/>} />
                        </Routes>
                    </main>

                    <footer className="app-footer">
                        <Footer />
                    </footer>
                </Router>
            </div>
        </AuthProvider>
    );
}

export default App;
