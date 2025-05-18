import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../NguoiDung/NguoiDungContext';
import logo from '../Icon/kzwlogo.png';
import './Navbar.css';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container-fluid">
                {/* Brand */}
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img
                        src={logo}
                        alt="Logo KZW"
                        className="site-logo"
                    />
                    <span className="brand-text">Quản Lý Chi Tiêu</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                {/* Menu chính */}
                <div className="collapse navbar-collapse" id="mainNavbar">

                    {/* User menu */}
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {user ? (
                            <>
                                <li className="nav-item">
                  <span className="nav-link">
                    <i className="bi bi-person-circle me-1"></i>
                      {user.hoTen}
                  </span>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-outline-light ms-2"
                                        onClick={logout}
                                    >
                                        Đăng xuất
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/DangKy">
                                        <i className="bi bi-person-plus me-1"></i>
                                        Đăng ký
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/DangNhap">
                                        <i className="bi bi-box-arrow-in-right me-1"></i>
                                        Đăng nhập
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
