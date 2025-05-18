import React from 'react';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from 'recharts';

const COLORS = [
    '#4f46e5',
    '#16a34a',
    '#db2777',
    '#f59e0b',
    '#3b82f6',
    '#10b981',
    '#e11d48',
    '#8b5cf6',
    '#f97316',
    '#047857',
    '#0ea5e9',
    '#a78bfa',
    '#22d3ee',
    '#fb7185',
    '#fde047',
    '#14b8a6',
    '#65a30d',
];

export default function TransactionChart({ data, title }) {
    return (
        <div style={{ width: '100%', height: 300 }}>
            {title && <h3 style={{ textAlign: 'center', marginBottom: 16 }}>{title}</h3>}
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) => value.toLocaleString() + ' VND'}
                    />
                    <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
