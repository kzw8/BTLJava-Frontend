// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Row,
    Col,
    Card,
    Spinner,
    Table
} from 'react-bootstrap';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, CartesianGrid
} from 'recharts';
import '../components/BieuDo/TransactionDateChart'
import TransactionDateChart from '../components/BieuDo/TransactionDateChart';
import { useAuth } from '../components/NguoiDung/NguoiDungContext';
import { Link } from 'react-router-dom';
import  '../components/Layout/DangKy.css'
import  '../components/Layout/DangNhap.css'

const COLORS = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'];

export default function Home() {
    const { user } = useAuth();
    const isLoggedIn = !!user;

    // --- Dữ liệu mẫu ---
    const dummyThu = [
        { tenDanhMuc: 'Lương', tong: 10000000 },
        { tenDanhMuc: 'Thưởng', tong: 2000000 },
    ];
    const dummyChi = [
        { tenDanhMuc: 'Ăn uống', tong: 500000 },
        { tenDanhMuc: 'Xăng xe', tong: 800000 },
        { tenDanhMuc: 'Mua sắm', tong: 1200000 },
    ];

    // --- State ---
    const [thongKeThu, setThongKeThu] = useState(dummyThu);
    const [thongKeChi, setThongKeChi] = useState(dummyChi);
    const [tongThu, setTongThu] = useState(dummyThu.reduce((s, i) => s + i.tong, 0));
    const [tongChi, setTongChi] = useState(dummyChi.reduce((s, i) => s + i.tong, 0));

    // --- Fetch khi user login ---
    useEffect(() => {
        if (!isLoggedIn) return;
        const userId = user.maNguoiDung;
        if (!userId) return;

        (async () => {
            try {
                const resThu = await axios.get('/api/giaodich/thongke-theo-danhmuc', {
                    params: { loai: 'THU', maNguoiDung: userId }
                });
                const dataThu = Array.isArray(resThu.data) ? resThu.data : [];
                setThongKeThu(dataThu);
                setTongThu(dataThu.reduce((s, x) => s + (x.tong || 0), 0));
            } catch (e) {
                console.error('Lỗi thống kê THU:', e);
            }

            try {
                const resChi = await axios.get('/api/giaodich/thongke-theo-danhmuc', {
                    params: { loai: 'CHI', maNguoiDung: userId }
                });
                const dataChi = Array.isArray(resChi.data) ? resChi.data : [];
                setThongKeChi(dataChi);
                setTongChi(dataChi.reduce((s, x) => s + (x.tong || 0), 0));
            } catch (e) {
                console.error('Lỗi thống kê CHI:', e);
            }
        })();
    }, [isLoggedIn, user]);



    useEffect(() => {
             if (!isLoggedIn) return;
            axios.get(`/api/giaodich/nguoidung/${user.maNguoiDung}`)
              .then(res => setTransactions(res.data))
               .catch(console.error);
          }, [isLoggedIn, user]);




    // Chuyển đổi dữ liệu cho PieChart
    const pieData = arr => arr.map(i => ({ name: i.tenDanhMuc, value: i.tong }));
    const [transactions, setTransactions] = useState([]);
    // Dữ liệu ví dụ cho LineChart (có thể thay bằng fetch thật)
    const dummyByDate = [
        { date: '2025-03-01', value: 100 },
        { date: '2025-03-05', value: 500 },
        { date: '2025-03-10', value: 150 },
        { date: '2025-03-15', value: 200 },
        { date: '2025-03-20', value: 120 },
        { date: '2025-03-25', value: 300 },
    ];

    // 1) Tính Top 3 danh mục Chi tiêu từ state
    const top3Chi = [...thongKeChi]
        .sort((a, b) => b.tong - a.tong)   // giảm dần theo tong
        .slice(0, 3);                      // lấy 3 phần tử

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4">Thống kê</h2>

            {/* ==== Row KPI Cards ==== */}
            <div className="row g-3 mb-5">
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <small className="text-muted">Tổng Thu</small>
                            <h4 className="fw-bold">{tongThu.toLocaleString()} VND</h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <small className="text-muted">Tổng Chi</small>
                            <h4 className="fw-bold">{tongChi.toLocaleString()} VND</h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <small className="text-muted">Số danh mục</small>
                            <h4 className="fw-bold">
                                {isLoggedIn
                                    ? thongKeThu.length + thongKeChi.length
                                    : dummyThu.length + dummyChi.length}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>

            {/* ==== Row Pie Charts ==== */}
            <div className="row g-4 mb-5">
                <div className="col-lg-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-header">Tỷ lệ THU theo danh mục</div>
                        <div className="card-body">
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={pieData(thongKeThu)}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                    >
                                        {pieData(thongKeThu).map((_, i) => (
                                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={v => v.toLocaleString()} />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-header">Tỷ lệ CHI theo danh mục</div>
                        <div className="card-body">
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={pieData(thongKeChi)}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                    >
                                        {pieData(thongKeChi).map((_, i) => (
                                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={v => v.toLocaleString()} />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* ==== Row Line Chart + Top 3 Widget ==== */}
            <div className="row g-4">
                {/* Line Chart */}
                <div className="col-lg-8">
                    <div className="card shadow-sm h-100">
                        <div className="card-header">Chi tiêu theo ngày</div>
                        <div className="chart-wrapper">
                            <TransactionDateChart data={transactions} />
                        </div>
                    </div>
                </div>

                {/* Top 3 danh mục */}
                <div className="col-lg-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-header">Top 3 danh mục Chi tiêu</div>
                        <ul className="list-group list-group-flush">
                            {top3Chi.map((item, idx) => {
                                // Đổi màu badge theo thứ hạng
                                const badgeClass =
                                    idx === 0
                                        ? 'bg-primary'
                                        : idx === 1
                                            ? 'bg-success'
                                            : 'bg-warning text-dark';
                                return (
                                    <li
                                        key={item.tenDanhMuc}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        {item.tenDanhMuc}
                                        <span className={`badge ${badgeClass}`}>
                      {item.tong.toLocaleString()}
                    </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            {/*  Chú ý dữ liệu*/}
            {!isLoggedIn && (
                <div className="alert alert-info mt-5">
                    * Đang là dữ liệu mẫu. Vui lòng{' '}
                    <Link to="/DangNhap" className="alert-link">
                        đăng nhập
                    </Link>{' '}
                    để xem chi tiết.
                </div>
            )}
        </div>
    );
}
