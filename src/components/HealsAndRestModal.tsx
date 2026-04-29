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

  // Current damage values (new structure)
  const normalPhysical = Number(char.normalPhysical ?? char.physical ?? 0);
  const drainPhysical = Number(char.drainPhysical ?? 0);
  const normalStun = Number(char.stun ?? 0);
  const drainStun = Number(char.drainStun ?? 0);

  const rollDice = (pool: number) => Array.from({ length: pool }, () => Math.floor(Math.random() * 6) + 1);
  const countHits = (rolls: number[]) => rolls.filter(d => d >= 5).length;

  // ==================== REST 1 HOUR ====================
  const restOneHour = () => {
    const pool = bod + wil;
    const rolls = rollDice(pool);
    const rawHits = countHits(rolls);

    let healedDrainStun = 0;
    let healedNormalStun = 0;

    if (drainStun > 0) healedDrainStun = Math.min(drainStun, rawHits);
    const remaining = rawHits - healedDrainStun;
    if (remaining > 0 && normalStun > 0) healedNormalStun = Math.min(normalStun, remaining);

    update((draft: any) => {
      if (healedDrainStun > 0) draft.drainStun = drainStun - healedDrainStun;
      if (healedNormalStun > 0) draft.stun = normalStun - healedNormalStun;
    });

    setLastResult({
      type: "Rest 1 Hour",
      pool,
      rawHits,
      healed: `Drain Stun: ${healedDrainStun} | Normal Stun: ${healedNormalStun}`,
      remaining: (drainStun - healedDrainStun) + (normalStun - healedNormalStun)
    });
  };

  // ==================== REST 1 DAY (Drain Physical first, then Normal Physical) ====================
  const restOneDay = () => {
    const pool = bod * 2;
    const rolls = rollDice(pool);
    const rawHits = countHits(rolls);

    let healedDrainPhysical = 0;
    let healedNormalPhysical = 0;

    if (drainPhysical > 0) healedDrainPhysical = Math.min(drainPhysical, rawHits);
    const remaining = rawHits - healedDrainPhysical;
    if (remaining > 0 && normalPhysical > 0) healedNormalPhysical = Math.min(normalPhysical, remaining);

    update((draft: any) => {
      if (healedDrainPhysical > 0) draft.drainPhysical = drainPhysical - healedDrainPhysical;
      if (healedNormalPhysical > 0) draft.normalPhysical = normalPhysical - healedNormalPhysical;
    });

    setLastResult({
      type: "Rest 1 Day",
      pool,
      rawHits,
      healed: `Drain Physical: ${healedDrainPhysical} | Normal Physical: ${healedNormalPhysical}`,
      remaining: (drainPhysical - healedDrainPhysical) + (normalPhysical - healedNormalPhysical)
    });
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0, 0, 0, 0.9)", zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#1e2937",
        borderRadius: "16px",
        width: "92%",
        maxWidth: "560px",
        maxHeight: "92vh",
        overflowY: "auto",
        padding: "24px",
        color: "white",
        border: "2px solid #c084fc"
      }}>
        <h2 style={{ color: "#67e8f9", textAlign: "center", marginBottom: "24px", letterSpacing: "2px" }}>
          ❤️ HEALS &amp; REST
        </h2>

        {/* Rule buttons */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
          <button
            onClick={() => { setShowFirstAid(!showFirstAid); setShowMedkit(false); }}
            style={{
              flex: 1,
              padding: "14px",
              background: "#22c55e",
              color: "#000",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "1rem"
            }}
          >
            📜 First Aid Rules
          </button>

          <button
            onClick={() => { setShowMedkit(!showMedkit); setShowFirstAid(false); }}
            style={{
              flex: 1,
              padding: "14px",
              background: "#a855f7",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "1rem"
            }}
          >
            📜 Medkit Rules
          </button>
        </div>

        {/* FIRST AID RULES */}
        {showFirstAid && (
          <div style={{
            background: "#111827",
            padding: "16px",
            borderRadius: "10px",
            fontSize: "0.9rem",
            lineHeight: "1.5",
            marginBottom: "20px",
            color: "#e0f2fe"
          }}>
            After the end of a combat encounter in which a character was injured, they have 1 minute (20 combat rounds if another fight kicks off) to receive First Aid.<br /><br />
            To apply First Aid, a character needs the right tools for the job, in this case a first aid kit. Any test made without a kit suffers a –2 dice pool modifier, and no Edge can be spent on the test.<br /><br />
            Make a Biotech + Logic test against a threshold equal to 5 – target’s Essence. If the target is one-hundred-percent natural, the healer actually gets an automatic hit added to what they roll. This represents the difficulty of repairing someone who has metal parts as well as those with organs not normally found in average people. Hits above the necessary threshold can be used to heal one box of Stun Damage (not including drain) per hit or one box of Physical Damage or Overflow per 2 hits. Drain cannot be healed with First Aid.<br /><br />
            A character can receive First Aid only once for any single set of injuries.
          </div>
        )}

        {/* MEDKIT RULES */}
        {showMedkit && (
          <div style={{
            background: "#111827",
            padding: "16px",
            borderRadius: "10px",
            fontSize: "0.9rem",
            lineHeight: "1.5",
            marginBottom: "20px",
            color: "#e0f2fe"
          }}>
            It takes one minute to hook up the patient, get the medkit to spit out a diagnosis, and begin treatment. The healing process takes one minute per box healed (so, if the process is interrupted, you know how many boxes were patched up). Each time a medkit is used, it consumes one batch of supplies. Treatment cannot be attempted if no medkit supplies remain.<br /><br />
            Make a Biotech + Logic test or a medkit rating + Logic test against a threshold of 5 – target’s Essence. If the target is one-hundred-percent natural, the healer gets an automatic hit added to their roll. Like First Aid, this fixes biological material, not machinery. Hits above the necessary threshold can be used to heal one box of Stun, Physical, or Overflow Damage per hit, but not damage from drain.<br /><br />
            There is a limit to receiving a medkit treatment. A character can only benefit from a medkit once for any single set of injuries.
          </div>
        )}

        {/* Rest buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
          <button
            onClick={restOneHour}
            style={{
              padding: "18px",
              background: "#eab308",
              color: "#000",
              border: "none",
              borderRadius: "12px",
              fontWeight: "bold",
              fontSize: "1.1rem"
            }}
          >
            ⏳ Rest 1 Hour
          </button>

          <button
            onClick={restOneDay}
            style={{
              padding: "18px",
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontWeight: "bold",
              fontSize: "1.1rem"
            }}
          >
            🌙 Rest 1 Day
          </button>
        </div>

        {/* Last result */}
        {lastResult && (
          <div style={{
            background: "#0f172a",
            padding: "18px",
            borderRadius: "12px",
            marginBottom: "24px",
            border: "1px solid #64748b"
          }}>
            <strong style={{ color: "#67e8f9" }}>{lastResult.type}</strong><br />
            Dice rolled: <strong>{lastResult.pool}</strong> → <strong>{lastResult.rawHits}</strong> successes<br />
            Healed: <span style={{ color: "#22c55e" }}>{lastResult.healed}</span><br />
            <span style={{ color: "#f87171" }}>Remaining boxes: {lastResult.remaining}</span>
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "18px",
            background: "#64748b",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "1.1rem"
          }}
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}