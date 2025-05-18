import React from "react";

function BangGiaoDich({ data, onEdit, onDelete }) {
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                <tr>
                    <th>#</th>
                    <th>Ngày</th>
                    <th>Loại</th>
                    <th>Danh mục</th>
                    <th>Số tiền</th>
                    <th>Mô tả</th>
                    <th>Thao tác</th>
                </tr>
                </thead>
                <tbody>
                {data.map((gd, index) => (
                    <tr key={gd.id}>
                        <td>{index + 1}</td>
                        <td>{gd.ngayGiaoDich}</td>
                        <td>{gd.loai}</td>
                        <td>{gd.danhMuc?.tenDanhMuc || '-'}</td>
                        <td>{gd.soTien.toLocaleString()} VND</td>
                        <td>{gd.moTa}</td>
                        <td>
                            <button className="btn btn-sm btn-primary mr-2" onClick={() => onEdit(gd)}>Sửa</button>
                            <button className="btn btn-sm btn-danger" onClick={() => onDelete(gd.id)}>Xóa</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default BangGiaoDich;
