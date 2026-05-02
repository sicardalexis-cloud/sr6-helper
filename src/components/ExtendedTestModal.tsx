// src/components/ExtendedTestModal.tsx
import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExtendedTestModal({ isOpen, onClose }: Props) {
  const [dicePool, setDicePool] = useState(8);
  const [threshold, setThreshold] = useState(12);
  const [maxAttempts, setMaxAttempts] = useState(6);

  const [results, setResults] = useState<any>(null);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = (pool: number) => 
    Array.from({ length: pool }, () => Math.floor(Math.random() * 6) + 1);

  const countHits = (rolls: number[]) => rolls.filter(d => d >= 5).length;

  const runExtendedTest = () => {
    setIsRolling(true);
    
    setTimeout(() => {
      let totalHits = 0;
      let attemptsUsed = 0;
      const allRolls: { attempt: number; dice: number[]; hits: number }[] = [];

      for (let i = 0; i < maxAttempts; i++) {
        const currentPool = Math.max(1, dicePool - i); // -1 dé par jet
        const rolls = rollDice(currentPool);
        const hits = countHits(rolls);

        totalHits += hits;
        attemptsUsed = i + 1;

        allRolls.push({
          attempt: i + 1,
          dice: rolls,
          hits: hits
        });

        if (totalHits >= threshold) break;
      }

      setResults({
        totalHits,
        attemptsUsed,
        allRolls,
        success: totalHits >= threshold
      });
      setIsRolling(false);
    }, 300);
  };

  const reset = () => {
    setResults(null);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 2000,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#0f172a", width: "95%", maxWidth: "900px", height: "88vh",
        borderRadius: "16px", border: "2px solid #c084fc", overflow: "hidden",
        display: "flex", flexDirection: "column"
      }}>
        <div style={{ padding: "16px 24px", background: "#1e2937", borderBottom: "1px solid #334155", display: "flex", justifyContent: "space-between" }}>
          <h2 style={{ color: "#c084fc", margin: 0 }}>📊 Extended Test</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#f87171", fontSize: "1.8rem" }}>✕</button>
        </div>

        <div style={{ padding: "24px", overflowY: "auto", flex: 1 }}>
          {/* Sliders */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "30px" }}>
            <div>
              <label>Dice Pool: <strong>{dicePool}</strong></label>
              <input type="range" min="1" max="20" value={dicePool} onChange={(e) => setDicePool(+e.target.value)} style={{ width: "100%" }} />
            </div>
            <div>
              <label>Required Hits: <strong>{threshold}</strong></label>
              <input type="range" min="1" max="30" value={threshold} onChange={(e) => setThreshold(+e.target.value)} style={{ width: "100%" }} />
            </div>
            <div>
              <label>Max Attempts: <strong>{maxAttempts}</strong></label>
              <input type="range" min="1" max="15" value={maxAttempts} onChange={(e) => setMaxAttempts(+e.target.value)} style={{ width: "100%" }} />
            </div>
          </div>

          <button 
            onClick={runExtendedTest}
            disabled={isRolling}
            style={{
              width: "100%", padding: "16px", background: "#22d3ee", color: "#0f172a",
              fontWeight: "bold", fontSize: "1.2rem", border: "none", borderRadius: "10px",
              cursor: "pointer", marginBottom: "24px"
            }}
          >
            {isRolling ? "Rolling..." : "🎲 Run Extended Test"}
          </button>

          {/* Résultats */}
          {results && (
            <div style={{ background: "#1e2937", padding: "20px", borderRadius: "12px", border: "1px solid #67e8f9" }}>
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <div style={{ fontSize: "2rem", color: results.success ? "#22c55e" : "#f87171" }}>
                  {results.totalHits} / {threshold} Hits
                </div>
                <div style={{ color: "#94a3b8" }}>
                  Attempts used: {results.attemptsUsed} / {maxAttempts}
                </div>
              </div>

              <div style={{ maxHeight: "420px", overflowY: "auto" }}>
                {results.allRolls.map((roll: any, index: number) => (
                  <div key={index} style={{ marginBottom: "16px", background: "#0f172a", padding: "12px", borderRadius: "8px" }}>
                    <div style={{ color: "#67e8f9", marginBottom: "6px" }}>
                      Attempt {roll.attempt} — Pool: {dicePool - (roll.attempt - 1)} dice
                    </div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "6px" }}>
                      {roll.dice.map((d: number, i: number) => (
                        <div key={i} style={{
                          width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center",
                          background: d >= 5 ? "#22c55e" : "#475569",
                          color: d >= 5 ? "#000" : "#fff",
                          borderRadius: "6px",
                          fontWeight: "bold"
                        }}>
                          {d}
                        </div>
                      ))}
                    </div>
                    <div style={{ color: "#86efac" }}>Hits: {roll.hits}</div>
                  </div>
                ))}
              </div>

              <button 
                onClick={reset}
                style={{
                  marginTop: "20px", width: "100%", padding: "14px", background: "#334155",
                  color: "white", border: "none", borderRadius: "10px", cursor: "pointer"
                }}
              >
                New Test
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}