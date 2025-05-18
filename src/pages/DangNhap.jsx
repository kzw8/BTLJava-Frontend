import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/NguoiDung/NguoiDungContext';
import '../components/Layout/DangNhap.css'
function DangNhap() {
    const [form, setForm] = useState({
        tenDangNhap: '',
        matKhau: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // từ context

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8080/api/nguoidung/login', form);
            const data = response.data;

            login(data); // lưu vào context
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Tên đăng nhập hoặc mật khẩu không đúng.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Đăng nhập</h2>
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

                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    );
}

export default DangNhap;
