import React from 'react';

function ThuChi({ thu, chi }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '2rem' }}>
            <div style={{ background: '#d4edda', padding: '1rem', borderRadius: '8px', minWidth: '150px' }}>
                <h4>Tổng Thu</h4>
                <p>{thu.toLocaleString()} VND</p>
            </div>
            <div style={{ background: '#f8d7da', padding: '1rem', borderRadius: '8px', minWidth: '150px' }}>
                <h4>Tổng Chi</h4>
                <p>{chi.toLocaleString()} VND</p>
            </div>
        </div>
    );
}

export default ThuChi;
