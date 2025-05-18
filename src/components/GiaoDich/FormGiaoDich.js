// src/components/GiaoDich/FormGiaoDich.js
// đã fix lỗi thêm giao dịch
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useAuth } from "../NguoiDung/NguoiDungContext";
import "../Layout/FormGiaoDich.css";

export default function FormGiaoDich({ initialData, onClose, onSuccess }) {
    const { user } = useAuth();
    const isEdit = Boolean(initialData);

    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        loai: "CHI",
        maDanhMuc: "",
        soTien: "",
        moTa: "",
        ngayGiaoDich: ""
    });

    // 1. Load danh mục
    useEffect(() => {
        if (!user) return;
        axios
            .get("/api/danhmuc", { params: { maNguoiDung: user.maNguoiDung } })
            .then(res => {
                const normalized = res.data.map(item => ({
                    maDanhMuc: item.maDanhMuc ?? item.MaDanhMuc,
                    tenDanhMuc: item.tenDanhMuc ?? item.TenDanhMuc
                }));
                setCategories(normalized);
            })
            .catch(err => {
                console.error("Lỗi load danh mục:", err);
                alert("Không tải được danh mục");
            });
    }, [user]);

    // 2. Nếu edit, đổ dữ liệu lên form
    useEffect(() => {
        if (initialData && categories.length) {
            const dm = initialData.danhMuc || {};
            const idDm = dm.maDanhMuc ?? dm.MaDanhMuc;
            const found = categories.find(c => c.maDanhMuc === idDm);
            setForm({
                loai: initialData.loai,
                maDanhMuc: found?.maDanhMuc || "",
                soTien: initialData.soTien,
                moTa: initialData.moTa,
                ngayGiaoDich: initialData.ngayGiaoDich
            });
        }
    }, [initialData, categories]);

    // 3. Khóa scroll body khi modal mở
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        // Validate bắt buộc
        if (!form.loai || !form.maDanhMuc || !form.soTien || !form.ngayGiaoDich) {
            return alert("Vui lòng nhập đầy đủ thông tin!");
        }

        // Chuẩn bị payload đúng với field backend cần
        const payload = {
            loai: form.loai,
            maDanhMuc: parseInt(form.maDanhMuc, 10),
            soTien: parseFloat(form.soTien),
            moTa: form.moTa,
            ngayGiaoDich: form.ngayGiaoDich,
            maNguoiDung: user.maNguoiDung
        };

        try {
            if (isEdit) {
                // Sửa thì PUT
                await axios.put(
                    `/api/giaodich/them-giaodich${initialData.id}/`,
                    payload
                );
            } else {
                // Thêm mới thì POST với slash cuối
                await axios.post(
                    `/api/giaodich/them-giaodich`,
                    payload
                );
            }
            onSuccess();
            onClose();
        } catch (err) {
            console.error("Lỗi khi lưu giao dịch:", err);
            alert("Lỗi khi lưu giao dịch!");
        }
    };

    // Nếu chưa có user hoặc form chưa sẵn, không render
    if (!user) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h4>{isEdit ? "Cập nhật giao dịch" : "Thêm giao dịch mới"}</h4>
                <form onSubmit={handleSubmit}>
                    {/* Loại */}
                    <div className="form-group">
                        <label>Loại:</label>
                        <select
                            name="loai"
                            value={form.loai}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="Thu">Thu</option>
                            <option value="Chi">Chi</option>
                        </select>
                    </div>
                    {/* Danh mục */}
                    <div className="form-group">
                        <label>Danh mục:</label>
                        <select
                            name="maDanhMuc"
                            value={form.maDanhMuc}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">-- Chọn danh mục --</option>
                            {categories.map(c => (
                                <option key={c.maDanhMuc} value={c.maDanhMuc}>
                                    {c.tenDanhMuc}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Số tiền */}
                    <div className="form-group">
                        <label>Số tiền:</label>
                        <input
                            type="number"
                            name="soTien"
                            value={form.soTien}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    {/* Ngày giao dịch */}
                    <div className="form-group">
                        <label>Ngày giao dịch:</label>
                        <input
                            type="date"
                            name="ngayGiaoDich"
                            value={form.ngayGiaoDich}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    {/* Mô tả */}
                    <div className="form-group">
                        <label>Mô tả:</label>
                        <input
                            type="text"
                            name="moTa"
                            value={form.moTa}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="text-end mt-3">
                        <button
                            type="button"
                            className="btn btn-secondary me-2"
                            onClick={onClose}
                        >
                            Hủy
                        </button>
                        <button type="submit" className="btn btn-success">
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}
