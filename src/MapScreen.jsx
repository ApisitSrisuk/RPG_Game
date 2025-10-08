// src/MapScreen.jsx

import React from 'react';

const MapScreen = ({ heroStats, startCombat, resetGame }) => {
    const heroName = heroStats?.name ?? 'Hero';
    const heroAtk = heroStats?.atk ?? 'N/A';
    const heroDef = heroStats?.def ?? 'N/A';

    return (
        <div style={{ 
            backgroundColor: '#f8f9fa', 
            color: '#333', 
            padding: '40px', 
            borderRadius: '12px', 
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
            maxWidth: '500px',
            margin: 'auto'
        }}>
            <h1>🗺️ World Map 🗺️</h1>
            <p style={{ fontSize: '1.1em' }}>
                ยินดีต้อนรับ, <strong style={{ color: '#007bff' }}>{heroName}</strong>! คุณพร้อมสำหรับภารกิจต่อไปหรือไม่?
            </p>
            
            <hr style={{ margin: '20px 0', borderColor: '#ccc' }} />

            <h3>🔥 Stats ปัจจุบัน 🔥</h3>
            <p>ATK: **{heroAtk}** | DEF: **{heroDef}**</p>
            <p style={{ fontSize: '0.9em', color: '#6c757d' }}>(HP/MP จะถูกฟื้นฟูหลังการต่อสู้)</p>
            
            <hr style={{ margin: '20px 0', borderColor: '#ccc' }} />

            <div style={{ marginTop: '20px' }}>
                <button 
                    onClick={startCombat} 
                    style={{ 
                        padding: '12px 25px', 
                        fontSize: '18px', 
                        cursor: 'pointer', 
                        backgroundColor: '#dc3545', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '6px',
                        marginRight: '10px'
                    }}
                >
                    💥 เข้าสู่การต่อสู้ (Goblin)
                </button>
                <button 
                    onClick={resetGame} 
                    style={{ 
                        padding: '12px 25px', 
                        fontSize: '18px', 
                        cursor: 'pointer', 
                        backgroundColor: '#6c757d', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '6px'
                    }}
                >
                    🔄 เริ่มเกมใหม่
                </button>
            </div>
        </div>
    );
};

export default MapScreen;