// src/components/LocNangCao/TransactionFilterForm.jsx
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../NguoiDung/NguoiDungContext";
import { Form, Row, Col, Button, Spinner, Alert } from "react-bootstrap";

export default function TransactionFilterForm({ onResult }) {
    const { user } = useAuth();

    const [form, setForm] = useState({
        loai: "",
        maDanhMuc: "",
        moTa: "",
        fromDate: "",
        toDate: "",
        minSoTien: "",
        maxSoTien: "",
    });
    const [danhMucOptions, setDanhMucOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Khi user hoặc loại thay đổi, load lại danh mục
    useEffect(() => {
        if (!form.loai || !user?.maNguoiDung) {
            setDanhMucOptions([]);
            return;
        }

        // Gọi API: GET /api/danhmuc?loai=CHI&maNguoiDung=1
        axios
            .get("/api/danhmuc", {
                params: {
                    loai: form.loai,               // "THU" hoặc "CHI"
                    maNguoiDung: user.maNguoiDung, // id user
                },
            })
            .then((res) => {
                // chuyển tất cả maDanhMuc về string để <select> match
                const opts = res.data.map((dm) => ({
                    maDanhMuc: String(dm.maDanhMuc ?? dm.MaDanhMuc),
                    tenDanhMuc: dm.tenDanhMuc ?? dm.TenDanhMuc,
                }));
                setDanhMucOptions(opts);
            })
            .catch((err) => {
                console.error("Lỗi load danh mục:", err);
                setDanhMucOptions([]);
            });
    }, [form.loai, user?.maNguoiDung]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            setError(null);
            setLoading(true);

            const payload = {
                loai: form.loai || null,
                maNguoiDung: user.maNguoiDung,
                maDanhMuc: form.maDanhMuc ? parseInt(form.maDanhMuc, 10) : null,
                moTa: form.moTa || null,
                fromDate: form.fromDate || null,
                toDate: form.toDate || null,
                minSoTien: form.minSoTien ? parseFloat(form.minSoTien) : null,
                maxSoTien: form.maxSoTien ? parseFloat(form.maxSoTien) : null,
            };

            try {
                const res = await axios.post("/api/giaodich/filter", payload);
                onResult(res.data);
            } catch (err) {
                console.error("Lỗi lọc giao dịch:", err);
                setError("Không thể lọc giao dịch. Vui lòng thử lại.");
            } finally {
                setLoading(false);
            }
        },
        [form, onResult, user.maNguoiDung]
    );

    return (
        <Form onSubmit={handleSubmit} className="card mb-4 p-3">
            <h5 className="mb-3">Lọc nâng cao</h5>

            {error && <Alert variant="danger">{error}</Alert>}

            <Row className="gy-2">
                {/* Loại */}
                <Col md={3}>
                    <Form.Group controlId="loai">
                        <Form.Label>Loại</Form.Label>
                        <Form.Select
                            name="loai"
                            value={form.loai}
                            onChange={handleChange}
                            isInvalid={!form.loai && !loading}
                        >
                            <option value="">-- Chọn loại --</option>
                            <option value="THU">Thu</option>
                            <option value="CHI">Chi</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Vui lòng chọn loại.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                {/* Danh mục */}
                <Col md={3}>
                    <Form.Group controlId="maDanhMuc">
                        <Form.Label>Danh mục</Form.Label>
                        <Form.Select
                            name="maDanhMuc"
                            value={form.maDanhMuc}
                            onChange={handleChange}
                            disabled={!form.loai}
                        >
                            <option value="">-- Chọn danh mục --</option>
                            {danhMucOptions.map((dm) => (
                                <option key={dm.maDanhMuc} value={dm.maDanhMuc}>
                                    {dm.tenDanhMuc}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>

                {/* Ghi chú */}
                <Col md={6}>
                    <Form.Group controlId="moTa">
                        <Form.Label>Ghi chú</Form.Label>
                        <Form.Control
                            type="text"
                            name="moTa"
                            placeholder="Nội dung mô tả"
                            value={form.moTa}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>

                {/* Từ ngày */}
                <Col md={3}>
                    <Form.Group controlId="fromDate">
                        <Form.Label>Từ ngày</Form.Label>
                        <Form.Control
                            type="date"
                            name="fromDate"
                            value={form.fromDate}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>

                {/* Đến ngày */}
                <Col md={3}>
                    <Form.Group controlId="toDate">
                        <Form.Label>Đến ngày</Form.Label>
                        <Form.Control
                            type="date"
                            name="toDate"
                            value={form.toDate}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>

                {/* Số tiền từ */}
                <Col md={3}>
                    <Form.Group controlId="minSoTien">
                        <Form.Label>Số tiền từ</Form.Label>
                        <Form.Control
                            type="number"
                            name="minSoTien"
                            placeholder="Từ"
                            value={form.minSoTien}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>

                {/* Đến */}
                <Col md={3}>
                    <Form.Group controlId="maxSoTien">
                        <Form.Label>Đến</Form.Label>
                        <Form.Control
                            type="number"
                            name="maxSoTien"
                            placeholder="Đến"
                            value={form.maxSoTien}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>

                {/* Nút Lọc */}
                <Col className="text-end">
                    <Button variant="primary" type="submit" disabled={!form.loai || loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : "Lọc"}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}
