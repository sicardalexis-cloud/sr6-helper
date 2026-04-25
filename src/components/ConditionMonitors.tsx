import React from "react";
import type { Character } from "../types/types";
import MonitorBox from "./UI/MonitorBox";

interface Props {
  char: Character;
  update: (key: keyof Character, value: number) => void;
}

export default function ConditionMonitors({ char, update }: Props) {
  const { body, willpower, physical, stun } = char;

  const physicalMax = Math.ceil(body / 2) + 8;
  const stunMax = Math.ceil(willpower / 2) + 8;

  const physicalBoxes = [];
  for (let i = 0; i < physicalMax; i++) {
    physicalBoxes.push(<MonitorBox key={i} filled={i < physical} color="red" />);
  }

  const stunBoxes = [];
  for (let i = 0; i < stunMax; i++) {
    stunBoxes.push(<MonitorBox key={i} filled={i < stun} color="yellow" />);
  }

  return (
    <div className="monitors-panel">

      {/* PHYSICAL */}
      <div className="monitor-section">
        <div className="monitor-title red">PHYSICAL MONITOR</div>

        <div className="monitor-row">{physicalBoxes}</div>

        <div className="monitor-controls">
          <button
            className="monitor-btn"
            onClick={() => update("physical", physical - 1)}
          >
            –
          </button>

          <div className="monitor-value">
            {physical} / {physicalMax}
          </div>

          <button
            className="monitor-btn"
            onClick={() => update("physical", physical + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* STUN */}
      <div className="monitor-section">
        <div className="monitor-title yellow">STUN MONITORS</div>

        <div className="monitor-subtitle">TOTAL</div>
        <div className="monitor-row">{stunBoxes}</div>

        <div className="monitor-controls">
          <button
            className="monitor-btn"
            onClick={() => update("stun", stun - 1)}
          >
            –
          </button>

          <div className="monitor-value">
            {stun} / {stunMax}
          </div>

          <button
            className="monitor-btn"
            onClick={() => update("stun", stun + 1)}
          >
            +
          </button>
        </div>

        <div className="monitor-subtitle">NORMAL STUN</div>
        <div className="monitor-subtitle">DRAIN</div>
      </div>
    </div>
  );
}
