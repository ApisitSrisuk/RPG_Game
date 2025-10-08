// src/App.jsx

import React, { useState } from 'react';
import CombatScreen from './CombatScreen';
import CharacterCreation from './CharacterCreation';
import MapScreen from './MapScreen'; // 👈 นำเข้า Component ใหม่
import { initialEnemy, createHeroStats } from './data'; 

function App() {
  // State: 'creation', 'map', 'combat', 'win', 'lose'
  const [gameState, setGameState] = useState('creation'); 
  const [heroStats, setHeroStats] = useState(null); 

  // --- Functions ---
  const handleCreationComplete = (statPoints) => {
    const finalStats = createHeroStats(statPoints);
    setHeroStats(finalStats);
    setGameState('map');
  };

  const handleEndCombat = (result) => {
    // ในเกมจริงต้องมีการอัปเดต heroStats (เช่น ฟื้น HP) ที่นี่ก่อนกลับไปหน้า map
    if (result === 'win' && heroStats) {
        // ตัวอย่าง: ฟื้นฟู HP/MP ทั้งหมดเมื่อชนะ
        setHeroStats(prev => ({ 
            ...prev, 
            hp: prev.maxHp, 
            mp: prev.maxMp 
        }));
    }
    setGameState(result); 
  };

  const startCombat = () => setGameState('combat');

  const resetGame = () => {
    setHeroStats(null);
    setGameState('creation'); 
  };

  let content;

  // --- Rendering Logic ---
  if (gameState === 'creation') {
    content = <CharacterCreation onComplete={handleCreationComplete} />;
  } else if (gameState === 'combat') {
    content = <CombatScreen 
                  initialHero={heroStats} 
                  initialEnemy={initialEnemy} 
                  onEndCombat={handleEndCombat} 
              />;
  } else if (gameState === 'map') { // 👈 ใช้ MapScreen ที่แยกออกมา
    content = <MapScreen 
                  heroStats={heroStats} 
                  startCombat={startCombat} 
                  resetGame={resetGame} 
              />;
  } else if (gameState === 'win') {
    content = (
      <div style={{ backgroundColor: '#28a745', color: 'white', padding: '30px', borderRadius: '10px' }}>
        <h1>🎉 VICTORY! 🎉</h1>
        <p>คุณเอาชนะศัตรูได้แล้ว!</p>
        <button onClick={() => setGameState('map')} style={{ padding: '10px', cursor: 'pointer', backgroundColor: 'gold', color: 'black', border: 'none', borderRadius: '5px', marginTop: '15px' }}>
            กลับสู่แผนที่
        </button>
      </div>
    );
  } else if (gameState === 'lose') {
    content = (
      <div style={{ backgroundColor: '#dc3545', color: 'white', padding: '30px', borderRadius: '10px' }}>
        <h1>💀 GAME OVER 💀</h1>
        <p>คุณพ่ายแพ้ในการต่อสู้...</p>
        <button onClick={resetGame} style={{ padding: '10px', cursor: 'pointer', backgroundColor: 'white', color: 'red', border: 'none', borderRadius: '5px', marginTop: '15px' }}>
            สร้างตัวละครใหม่
        </button>
      </div>
    );
  }
  // 💡 หมายเหตุ: เราลบโค้ด `else` เดิมออกไปแล้ว เนื่องจากเราใช้ `else if (gameState === 'map')` แทน

  return (
    <div style={{ textAlign: 'center', padding: '40px', fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#212529', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {content}
    </div>
  );
}

export default App;