// src/components/HealsAndRestModal.tsx
import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  char: any;
  update: (fn: (draft: any) => void) => void;
}

export default function HealsAndRestModal({ isOpen, onClose, char, update }: Props) {
  const [showFirstAid, setShowFirstAid] = useState(false);
  const [showMedkit, setShowMedkit] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);

  if (!isOpen) return null;

  const bod = char.attributes?.BOD ?? 3;
  const wil = char.attributes?.WIL ?? 3;
  const physicalCurrent = Number(char.physical ?? 0);
  const stunCurrent = Number(char.stun ?? 0);
  const drainCurrent = Number(char.drainStun ?? 0);

  const rollDice = (pool: number) => Array.from({ length: pool }, () => Math.floor(Math.random() * 6) + 1);
  const countHits = (rolls: number[]) => rolls.filter(d => d >= 5).length;

  // Rest 1 Hour : WIL + BOD
  const restOneHour = () => {
    const pool = bod + wil;
    const rolls = rollDice(pool);
    const rawHits = countHits(rolls);

    let healedDrain = 0;
    let healedStun = 0;

    // Drain Stun en priorité
    if (drainCurrent > 0) {
      healedDrain = Math.min(drainCurrent, rawHits);
    }
    const remainingHits = rawHits - healedDrain;
    if (remainingHits > 0 && stunCurrent > 0) {
      healedStun = Math.min(stunCurrent, remainingHits);
    }

    update((draft: any) => {
      if (healedDrain > 0) draft.drainStun = drainCurrent - healedDrain;
      if (healedStun > 0) draft.stun = stunCurrent - healedStun;
    });

    setLastResult({
      type: "1 Hour",
      pool,
      rawHits,
      healedDrain,
      healedStun,
      remainingDrain: drainCurrent - healedDrain,
      remainingStun: stunCurrent - healedStun
    });
  };

  // Rest 1 Day : BOD × 2
  const restOneDay = () => {
    const pool = bod * 2;                    // ← MODIFIÉ comme tu l'as demandé
    const rolls = rollDice(pool);
    const rawHits = countHits(rolls);
    const healedPhysical = Math.min(physicalCurrent, Math.max(1, rawHits));

    update((draft: any) => {
      draft.physical = physicalCurrent - healedPhysical;
    });

    setLastResult({
      type: "1 Day",
      pool,
      rawHits,
      healedPhysical,
      remainingPhysical: physicalCurrent - healedPhysical
    });
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)", display: "flex",
      alignItems: "center", justifyContent: "center", zIndex: 10000
    }}>
      <div style={{
        background: "#1e2937", width: "92%", maxWidth: "560px",
        borderRadius: "16px", padding: "24px", border: "2px solid #22ff88",
        maxHeight: "92vh", overflowY: "auto"
      }}>
        <h2 style={{ color: "#67e8f9", textAlign: "center", marginBottom: "20px" }}>
          HEALS &amp; REST
        </h2>

        {/* Natural Recovery */}
        <div style={{ marginBottom: "28px" }}>
          <h3 style={{ color: "#67e8f9", marginBottom: "12px" }}>Natural Recovery</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <button onClick={restOneHour} style={{ padding: "18px", background: "#22c55e", color: "#000", border: "none", borderRadius: "12px", fontWeight: "bold" }}>
              ⏳ Rest 1 Hour<br/><small>WIL + BOD</small>
            </button>
            <button onClick={restOneDay} style={{ padding: "18px", background: "#eab308", color: "#000", border: "none", borderRadius: "12px", fontWeight: "bold" }}>
              🌅 Rest 1 Day<br/><small>BOD × 2</small>
            </button>
          </div>
        </div>

        {/* Résultat du dernier jet */}
        {lastResult && (
          <div style={{ background: "#111827", padding: "14px", borderRadius: "10px", marginBottom: "24px", fontSize: "0.95rem" }}>
            <strong>Dernier repos : {lastResult.type}</strong><br/>
            {lastResult.pool} dés → <strong>{lastResult.rawHits}</strong> succès<br/><br/>
            {lastResult.healedDrain !== undefined && lastResult.healedDrain > 0 && (
              <>Drain Stun soigné : <strong>{lastResult.healedDrain}</strong> (restant : {lastResult.remainingDrain})<br/></>
            )}
            {lastResult.healedStun !== undefined && lastResult.healedStun > 0 && (
              <>Stun soigné : <strong>{lastResult.healedStun}</strong> (restant : {lastResult.remainingStun})<br/></>
            )}
            {lastResult.healedPhysical !== undefined && lastResult.healedPhysical > 0 && (
              <>Physical soigné : <strong>{lastResult.healedPhysical}</strong> (restant : {lastResult.remainingPhysical})<br/></>
            )}
          </div>
        )}

        {/* Règles First Aid / Medkit */}
        <div style={{ marginBottom: "20px" }}>
          <button onClick={() => { setShowFirstAid(!showFirstAid); setShowMedkit(false); }} style={{ width: "100%", padding: "14px", marginBottom: "8px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "bold" }}>
            📜 First Aid Rules
          </button>
          {showFirstAid && (
            <div style={{ background: "#111827", padding: "14px", borderRadius: "10px", fontSize: "0.9rem", lineHeight: "1.45", marginBottom: "12px" }}>
              After the end of a combat encounter in which a character was injured, they have 1 minute (20 combat rounds if another fight kicks off) to receive First Aid.<br/><br/>
              To apply First Aid, a character needs the right tools for the job, in this case a first aid kit. Any test made without a kit suffers a –2 dice pool modifier, and no Edge can be spent on the test.<br/><br/>
              Make a Biotech + Logic test against a threshold equal to 5 – target’s Essence. If the target is one-hundred-percent natural, the healer actually gets an automatic hit added to what they roll.<br/><br/>
              Hits above the necessary threshold can be used to heal one box of Stun Damage (not including drain) per hit or one box of Physical Damage or Overflow per 2 hits. Drain cannot be healed with First Aid.<br/><br/>
              A character can receive First Aid only once for any single set of injuries.
            </div>
          )}

          <button onClick={() => { setShowMedkit(!showMedkit); setShowFirstAid(false); }} style={{ width: "100%", padding: "14px", marginBottom: "8px", background: "#a855f7", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "bold" }}>
            📜 Medkit Rules
          </button>
          {showMedkit && (
            <div style={{ background: "#111827", padding: "14px", borderRadius: "10px", fontSize: "0.9rem", lineHeight: "1.45" }}>
              It takes one minute to hook up the patient, get the medkit to spit out a diagnosis, and begin treatment.<br/>
              The healing process takes one minute per box healed.<br/>
              Each time a medkit is used, it consumes one batch of supplies.<br/>
              Treatment cannot be attempted if no medkit supplies remain.<br/><br/>
              <strong>Test :</strong> Biotech + Logic or Medkit Rating + Logic<br/>
              Threshold = 5 – target’s Essence.<br/>
              If the target is 100% natural, the healer gets an automatic hit.<br/>
              Hits above the threshold heal 1 box of Stun, Physical, or Overflow per hit (but not Drain).<br/>
              A character can only benefit from a medkit once for any single set of injuries.
            </div>
          )}
        </div>

        <button onClick={onClose} style={{ width: "100%", padding: "16px", background: "#64748b", color: "#fff", border: "none", borderRadius: "12px", fontWeight: "bold" }}>
          FERMER
        </button>
      </div>
    </div>
  );
}