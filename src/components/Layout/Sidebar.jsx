import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const menuItems = [
    { to: '/',               icon: 'bi-house',            label: 'Dashboard' },
    { to: '/transactions',   icon: 'bi-list-check',       label: 'Giao dịch' },
    { to: '/reports/category', icon: 'bi-bar-chart',      label: 'Báo cáo CDM' },
    { to: '/reports/date',     icon: 'bi-calendar-event', label: 'Báo cáo Ngày' },
];

export default function Sidebar({ onToggleTheme, onLogout }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>

            <nav className="menu">
                {menuItems.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className="menu-link"
                        activeClassName="active"
                    >
                        <i className={`bi ${item.icon}`}></i>
                        {!collapsed && <span className="label">{item.label}</span>}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}
