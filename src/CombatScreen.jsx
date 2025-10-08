// src/CombatScreen.jsx
import React, { useState, useEffect } from 'react';

// รับ initialHero และ initialEnemy จาก Props ที่ส่งมาจาก App.jsx
const CombatScreen = ({ initialHero, initialEnemy, onEndCombat }) => {
  // ใช้ค่าจาก Props เป็น State เริ่มต้น
  const [hero, setHero] = useState(initialHero); 
  const [enemy, setEnemy] = useState(initialEnemy); 
  const [combatLog, setCombatLog] = useState([]); // บันทึกเหตุการณ์
  const [isHeroTurn, setIsHeroTurn] = useState(true); // กำหนดเทิร์น

  // ฟังก์ชันบันทึกเหตุการณ์ลง Combat Log
  const log = (message) => {
    setCombatLog((prevLog) => [`> ${message}`, ...prevLog.slice(0, 4)]); // เก็บ 5 บรรทัดล่าสุด
  };

  // 1. ฟังก์ชันคำนวณดาเมจ
  const calculateDamage = (attacker, defender) => {
    // ดาเมจ = ATK ของผู้โจมตี - DEF ของผู้ป้องกัน (อย่างน้อย 1 ดาเมจ)
    const damage = Math.max(1, attacker.atk - defender.def);
    return damage;
  };

  // 2. ฟังก์ชันจัดการการโจมตีพื้นฐาน (Attack)
  const handleAttack = (source, target, setTarget, isPlayerAction = true) => {
    // ป้องกันการทำซ้ำหากใครคนใดคนหนึ่งตายแล้ว
    if (hero.hp <= 0 || enemy.hp <= 0) return;

    const damage = calculateDamage(source, target);
    const newHp = Math.max(0, target.hp - damage);

    // อัปเดต HP ของเป้าหมาย
    setTarget((prev) => ({ ...prev, hp: newHp }));
    
    // บันทึก Log
    log(`${source.name} โจมตี ${target.name} สร้างความเสียหาย ${damage}!`);

    // ตรวจสอบผลลัพธ์หลังการโจมตี
    if (newHp <= 0) {
      log(`${target.name} ถูกกำจัดแล้ว!`);
      // เมื่อจบการต่อสู้ จะเรียก onEndCombat
      setTimeout(() => {
        onEndCombat(isPlayerAction ? 'win' : 'lose');
      }, 1500);
    } else {
      // หากยังไม่จบ ให้เปลี่ยนเทิร์น
      setIsHeroTurn(!isHeroTurn); 
    }
  };

  // 3. AI ของศัตรู
  const enemyAI = () => {
    if (enemy.hp > 0 && hero.hp > 0) {
      // AI ง่ายๆ: ศัตรูโจมตีฮีโร่เสมอ
      setTimeout(() => {
        // อัปเดต State Hero ก่อนที่จะเรียก handleAttack
        handleAttack(enemy, hero, setHero, false); 
      }, 1000); // หน่วงเวลาให้ดูเหมือนกำลังคิด
    }
  };

  // 4. useEffect: จัดการการเล่นเทิร์นของศัตรู
  useEffect(() => {
    if (!isHeroTurn && enemy.hp > 0 && hero.hp > 0) {
      enemyAI();
    }
  }, [isHeroTurn, hero.hp, enemy.hp]); // ตรวจสอบทุกครั้งที่เปลี่ยนเทิร์นหรือ HP เปลี่ยน

  const HeroStatDisplay = ({ char }) => (
    <div style={{ textAlign: 'center', padding: '15px', backgroundColor: char.isPlayer ? '#4e4e4e' : '#6e4e4e', borderRadius: '8px' }}>
      <h3>{char.name} {char.isPlayer ? "(Hero)" : "(Enemy)"}</h3>
      <p style={{ margin: '5px 0' }}>HP: {char.hp} / {char.maxHp}</p>
      <div style={{ height: '15px', backgroundColor: char.isPlayer ? '#004d00' : '#800000', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{ height: '100%', backgroundColor: char.isPlayer ? 'lime' : 'red', width: `${(char.hp / char.maxHp) * 100}%`, transition: 'width 0.5s' }}></div>
      </div>
      <p style={{ margin: '5px 0', fontSize: '0.8em' }}>ATK: {char.atk} | DEF: {char.def}</p>
      {char.isPlayer && <p style={{ margin: '5px 0', fontSize: '0.8em' }}>MP: {char.mp} / {char.maxMp}</p>}
    </div>
  );


  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', maxWidth: '600px', margin: '20px auto', backgroundColor: '#333', color: 'white', borderRadius: '10px' }}>
      <h2>⚔️ Combat Zone ⚔️</h2>
      <p style={{ color: isHeroTurn ? 'lime' : 'yellow' }}>Turn: {isHeroTurn ? 'Hero\'s Turn' : 'Enemy\'s Turn (Waiting...)'}</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px', marginBottom: '30px' }}>
        {/* --------------- ENEMY DISPLAY --------------- */}
        <HeroStatDisplay char={enemy} />
        {/* --------------- HERO DISPLAY --------------- */}
        <HeroStatDisplay char={hero} />
      </div>

      {/* --------------- ACTION MENU --------------- */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button 
          onClick={() => handleAttack(hero, enemy, setEnemy)} 
          disabled={!isHeroTurn || hero.hp <= 0 || enemy.hp <= 0}
          style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: isHeroTurn ? '#007bff' : 'gray', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          💥 Attack (โจมตี)
        </button>
        <button 
          onClick={() => { log("Hero ใช้ Skill แต่ไม่มี MP พอ..."); setIsHeroTurn(false); }} 
          disabled={!isHeroTurn || hero.mp < 10 || hero.hp <= 0 || enemy.hp <= 0} // สมมติว่า Skill ใช้ 10 MP
          style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: isHeroTurn ? '#28a745' : 'gray', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          ✨ Skill (10 MP)
        </button>
      </div>

      {/* --------------- COMBAT LOG --------------- */}
      <div style={{ marginTop: '20px', padding: '10px', border: '1px dashed #777', height: '100px', overflowY: 'scroll', backgroundColor: '#222', borderRadius: '8px' }}>
        <h4>Combat Log</h4>
        {combatLog.map((line, index) => (
          <p key={index} style={{ margin: '0', fontSize: '14px' }}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default CombatScreen;