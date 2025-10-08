// src/data.js

// กำหนด Base Stats ที่ต่ำ
export const baseHeroStats = {
  name: "New Hero",
  hp: 50,    // Base HP
  mp: 10,    // Base MP
  atk: 5,    // Base Attack
  def: 2,    // Base Defense
};

// จำกัด Point รวมที่ผู้เล่นสามารถใช้ได้
export const MAX_STAT_POINTS = 20; 

// ข้อมูลศัตรูเริ่มต้น
export const initialEnemy = {
  name: "Goblin",
  hp: 60,
  maxHp: 60,
  atk: 10,
  def: 3,
  isPlayer: false,
};

// ฟังก์ชันสำหรับคำนวณ Stats สุดท้ายตาม Point ที่ผู้เล่นกำหนด
export const createHeroStats = (points) => {
    // สูตรการคำนวณ:
    // HP: Base + (Point * 5)
    // MP: Base + (Point * 3)
    // ATK/DEF: Base + (Point * 1)
    const heroHp = baseHeroStats.hp + (points.hp * 5); 
    const heroMp = baseHeroStats.mp + (points.mp * 3);
    const heroAtk = baseHeroStats.atk + points.atk;    
    const heroDef = baseHeroStats.def + points.def;    

    return {
        name: "Custom Hero",
        hp: heroHp,
        maxHp: heroHp,
        mp: heroMp,
        maxMp: heroMp,
        atk: heroAtk,
        def: heroDef,
        isPlayer: true,
    };
};