// src/CharacterCreation.jsx
import React, { useState } from 'react';
import { MAX_STAT_POINTS, baseHeroStats } from './data';

const CharacterCreation = ({ onComplete }) => {
    // State สำหรับเก็บ Point ที่ใช้ในการอัปเกรด
    const [points, setPoints] = useState({
        hp: 0,
        mp: 0,
        atk: 0,
        def: 0,
    });
    const totalPointsUsed = points.hp + points.mp + points.atk + points.def;
    const pointsRemaining = MAX_STAT_POINTS - totalPointsUsed;

    // ฟังก์ชันจัดการการเพิ่ม/ลด Point
    const handleStatChange = (statName, delta) => {
        setPoints(prevPoints => {
            const newPoints = { ...prevPoints, [statName]: prevPoints[statName] + delta };
            const newTotal = newPoints.hp + newPoints.mp + newPoints.atk + newPoints.def;

            // เงื่อนไข: ห้ามใช้เกิน MAX_STAT_POINTS และห้ามค่าติดลบ
            if (newTotal <= MAX_STAT_POINTS && newPoints[statName] >= 0) {
                return newPoints;
            }
            return prevPoints;
        });
    };

    // ฟังก์ชันเริ่มเกม
    const handleSubmit = () => {
        if (totalPointsUsed > 0) {
            onComplete(points);
        } else {
            console.warn("กรุณาใช้ Stat Point อย่างน้อย 1 Point!");
        }
    };

    // แสดงผล Stat ปัจจุบัน (คำนวณจาก baseHeroStats และ points)
    const currentStats = {
        hp: baseHeroStats.hp + (points.hp * 5),
        mp: baseHeroStats.mp + (points.mp * 3),
        atk: baseHeroStats.atk + points.atk,
        def: baseHeroStats.def + points.def,
    };

    const statFields = [
        { name: 'HP (Max Life)', key: 'hp', base: baseHeroStats.hp, multi: 5 },
        { name: 'MP (Magic/Energy)', key: 'mp', base: baseHeroStats.mp, multi: 3 },
        { name: 'ATK (Attack)', key: 'atk', base: baseHeroStats.atk, multi: 1 },
        { name: 'DEF (Defense)', key: 'def', base: baseHeroStats.def, multi: 1 },
    ];

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '20px auto', border: '2px solid gold', borderRadius: '10px', backgroundColor: '#1e1e1e', color: 'white', boxShadow: '0 0 15px rgba(255, 215, 0, 0.5)' }}>
            <h2>👤 สร้างตัวละครของคุณ 👤</h2>
            <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: pointsRemaining > 0 ? 'skyblue' : 'lightcoral' }}>
                เหลือ Point: {pointsRemaining} / {MAX_STAT_POINTS}
            </p>
            
            <hr style={{ borderColor: '#444' }} />

            {statFields.map(({ name, key, base, multi }) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '15px 0' }}>
                    <span style={{ fontWeight: 'bold', flex: 1, textAlign: 'left' }}>{name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <button 
                            onClick={() => handleStatChange(key, -1)} 
                            disabled={points[key] === 0}
                            style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#555', color: 'white', border: 'none', borderRadius: '5px' }}
                        >-</button>
                        <span style={{ width: '30px', textAlign: 'center', backgroundColor: '#333', padding: '5px', borderRadius: '5px' }}>
                            {points[key]}
                        </span>
                        <button 
                            onClick={() => handleStatChange(key, 1)} 
                            disabled={pointsRemaining === 0}
                            style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#555', color: 'white', border: 'none', borderRadius: '5px' }}
                        >+</button>
                        <span style={{ marginLeft: '15px', color: 'lime', fontSize: '0.9em' }}>
                             (Base: {base} +{points[key] * multi})
                        </span>
                    </div>
                </div>
            ))}

            <hr style={{ borderColor: '#444' }} />
            
            <h3>สรุป Stats (ปัจจุบัน)</h3>
            <p>Max HP: <strong style={{color:'red'}}>{currentStats.hp}</strong> | Max MP: <strong style={{color:'blue'}}>{currentStats.mp}</strong></p>
            <p>ATK: <strong style={{color:'orange'}}>{currentStats.atk}</strong> | DEF: <strong style={{color:'gray'}}>{currentStats.def}</strong></p>

            <button 
                onClick={handleSubmit}
                disabled={totalPointsUsed === 0}
                style={{ marginTop: '20px', padding: '10px 20px', fontSize: '1.1em', cursor: 'pointer', backgroundColor: 'gold', color: 'black', border: 'none', borderRadius: '8px' }}
            >
                เริ่มเกม
            </button>
        </div>
    );
};

export default CharacterCreation;