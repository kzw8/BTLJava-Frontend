import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/Layout/DangKy.css'
function Register() {
    const [form, setForm] = useState({
        tenDangNhap: '',
        matKhau: '',
        email: '',
        hoTen: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.post('http://localhost:8080/api/nguoidung/register', form);
            alert('Đăng ký thành công. Bạn có thể đăng nhập.');
            navigate('/login');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Đăng ký thất bại.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Đăng ký</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Tên đăng nhập:</label>
                    <input
                        type="text"
                        name="tenDangNhap"
                        value={form.tenDangNhap}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>Mật khẩu:</label>
                    <input
                        type="password"
                        name="matKhau"
                        value={form.matKhau}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>Họ tên:</label>
                    <input
                        type="text"
                        name="hoTen"
                        value={form.hoTen}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Đăng ký</button>
            </form>
        </div>
    );
}

export default Register;
