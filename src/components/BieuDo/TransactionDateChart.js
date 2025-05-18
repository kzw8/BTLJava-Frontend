// Ở đầu file, trước component
import React from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip
} from 'recharts';
import  '../Layout/TransactionDateChart.css'

// Custom Tooltip
function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    const value = payload[0].value;
    return (
        <div className="custom-tooltip">
            <p className="label">{`Ngày: ${label}`}</p>
            <p className="value">{`Chi tiêu: ${value.toLocaleString()} VND`}</p>
        </div>
    );
}

export default function TransactionDateChart({ data }) {
    // chuyển thành mảng và aggregate nếu cần
    const chartData = data
        .map(d => ({ date: d.ngayGiaoDich.slice(0,10), value: d.soTien }))
        .sort((a, b) => a.date.localeCompare(b.date));

    return (
        <div className="transaction-date-chart">
            <h5 className="chart-title">Chi tiêu theo ngày</h5>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={50}
                        interval="preserveStartEnd"
                    />
                    <YAxis
                        width={70}
                        tickFormatter={v => v.toLocaleString()}
                    />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#4f46e5"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

