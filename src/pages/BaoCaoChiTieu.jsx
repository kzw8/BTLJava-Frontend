/* global process */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../components/NguoiDung/NguoiDungContext";
import TransactionChart from "../components/BieuDo/TransactionChart";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Spinner,
    Table,
    FloatingLabel,
} from "react-bootstrap";
import "../components/Layout/BaoCaoChiTieu.css";

export default function BaoCaoChiTieu() {
    const { user } = useAuth();
    const [loai, setLoai] = useState("CHI");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Lấy API_BASE từ env, nếu không có thì fallback
    const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080/api";

    useEffect(() => {
        if (!user) return;
        setLoading(true);

        axios
            .get(`${API_BASE}/giaodich/thongke-theo-danhmuc`, {
                params: { loai, maNguoiDung: user.maNguoiDung },
            })
            .then((res) => {
                const chartData = res.data.map((item) => ({
                    name: item.tenDanhMuc,
                    value: item.tong,
                }));
                setData(chartData);
            })
            .catch((err) => {
                console.error("Lỗi khi load báo cáo:", err);
                setData([]);
            })
            .finally(() => setLoading(false));
    }, [user, loai, API_BASE]);

    return (
        <Container fluid className="reports-category-page py-4">

            <Row className="rc-header align-items-center mb-4">
                <Col>
                    <h2 className="rc-title">Báo cáo Chi tiêu</h2>
                </Col>
                <Col xs="auto">
                    <FloatingLabel
                        controlId="selectLoai"
                        label="Loại"
                        className="cr-filter-select"
                    >
                        <Form.Select
                            size="sm"
                            value={loai}
                            onChange={(e) => setLoai(e.target.value)}
                        >
                            <option value="CHI">Chi</option>
                            <option value="THU">Thu</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>

            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : data.length > 0 ? (
                <Row className="g-4 rc-content">
                    <Col lg={8}>
                        <Card className="shadow-sm">
                            <Card className="shadow-sm report-chart-card">
                            <Card.Body>
                                <TransactionChart
                                    data={data}
                                    title={`Tỷ lệ ${loai === "CHI" ? "Chi" : "Thu"} theo danh mục`}
                                />
                            </Card.Body>
                            </Card>
                        </Card>
                    </Col>

                    <Col lg={4}>
                        <Card className="shadow-sm">
                            <Card.Header>Chi tiết danh mục</Card.Header>
                            <Card.Body className="p-0">

                                <Table hover striped responsive className="mb-0">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Danh mục</th>
                                        <th className="text-end">Tổng tiền</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {data.map((d, i) => (
                                        <tr key={d.name}>
                                            <td>{i + 1}</td>
                                            <td>{d.name}</td>
                                            <td className="text-end">
                                                {d.value.toLocaleString()} VND
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>

                                    <tfoot>
                                    <tr>
                                        <td colSpan={2}><strong>Tổng cộng</strong></td>
                                        <td className="text-end">
                                            <strong>
                                                {data
                                                    .reduce((sum, d) => sum + d.value, 0)
                                                    .toLocaleString()} VND
                                            </strong>
                                        </td>
                                    </tr>
                                    </tfoot>
                                </Table>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <div className="text-center text-muted py-5">
                    Không có dữ liệu để hiển thị.
                </div>
            )}
        </Container>
    );
}
