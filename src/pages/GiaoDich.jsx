import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, Alert, ToastContainer, Toast, Button } from 'react-bootstrap';
import TransactionFilterForm from '../components/LocNangCao/TransactionFilterForm';
import TransactionDateChart from '../components/BieuDo/TransactionDateChart';
import BangGiaoDich from '../components/GiaoDich/BangGiaoDich';
import FormGiaoDich from '../components/GiaoDich/FormGiaoDich';
import ThuChi from '../components/TomTat/ThuChi';
import { useAuth } from '../components/NguoiDung/NguoiDungContext';
import '../components/Layout/FormGiaoDich.css';

export default function GiaoDich() {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [selected, setSelected]       = useState(null);
    const [showForm, setShowForm]       = useState(false);
    const [loading, setLoading]         = useState(false);
    const [toast, setToast]             = useState({ show: false, msg: '', variant: 'info' });

    const loadAll = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const res = await axios.get(`/api/giaodich/nguoidung/${user.maNguoiDung}`);
            setTransactions(res.data);
        } catch (err) {
            console.error(err);
            setToast({ show: true, msg: 'Lỗi khi tải giao dịch', variant: 'danger' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAll();
    }, [user]);

    const handleFilter = filteredData => {
        setTransactions(filteredData);
        setToast({
            show: true,
            msg: `Đã lọc được ${filteredData.length} giao dịch`,
            variant: 'success'
        });
    };

    const handleDelete = async id => {
        if (!window.confirm('Bạn có chắc muốn xóa?')) return;
        try {
            await axios.delete(`/api/giaodich/${id}`);
            await loadAll();
            setToast({ show: true, msg: 'Xóa thành công', variant: 'success' });
        } catch (err) {
            console.error(err);
            setToast({ show: true, msg: 'Lỗi khi xóa giao dịch', variant: 'danger' });
        }
    };

    const handleEdit = item => {
        setSelected(item);
        setShowForm(true);
    };
    const handleAddNew = () => {
        setSelected(null);
        setShowForm(true);
    };

    if (!user) {
        return <p className="p-4">Vui lòng đăng nhập để xem giao dịch.</p>;
    }

    return (
        <div className="giao-dich-page container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Giao dịch</h2>
                <Button onClick={handleAddNew}>➕ Thêm giao dịch</Button>
            </div>

            <TransactionFilterForm onResult={handleFilter} />

            {loading
                ? <div className="text-center"><Spinner animation="border" /></div>
                : transactions.length === 0
                    ? <Alert variant="info">Không có giao dịch nào.</Alert>
                    : <>
                        {/* tổng thu/chi */}
                        <ThuChi
                            thu={transactions.filter(t => t.loai.toUpperCase()==='THU')
                                .reduce((s,t)=>s+t.soTien,0)}
                            chi={transactions.filter(t => t.loai.toUpperCase()==='CHI')
                                .reduce((s,t)=>s+t.soTien,0)}
                        />

                        {/* biểu đồ + cách ly bảng bằng margin */}
                        <div className="chart-wrapper">
                            <TransactionDateChart data={transactions} />
                        </div>

                        <div className="table-wrapper">
                            <BangGiaoDich
                                data={transactions}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </div>
                    </>
            }

            {showForm &&
                <FormGiaoDich
                    initialData={selected}
                    onClose={() => setShowForm(false)}
                    onSuccess={() => {
                        setShowForm(false);
                        loadAll();
                        setToast({
                            show: true,
                            msg: selected
                                ? 'Cập nhật giao dịch thành công'
                                : 'Thêm giao dịch thành công',
                            variant:'success'
                        });
                    }}
                />
            }

            <ToastContainer position="bottom-end" className="p-3">
                <Toast
                    onClose={() => setToast(t => ({ ...t, show: false }))}
                    show={toast.show}
                    bg={toast.variant}
                    delay={3000}
                    autohide
                >
                    <Toast.Body className="text-white">{toast.msg}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
}
