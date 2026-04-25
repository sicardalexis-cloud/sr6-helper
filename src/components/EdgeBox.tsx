import type { Character } from "../types/types";

interface Props {
  char: Character;
  update: (key: keyof Character, value: number) => void;
}

export function EdgeBox({ char, update }: Props) {
  return (
    <section>
      <h2>Edge</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <span>Max</span>
        <button onClick={() => update("edgeMax", char.edgeMax - 1)}>-</button>
        <span>{char.edgeMax}</span>
        <button onClick={() => update("edgeMax", char.edgeMax + 1)}>+</button>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <span>Actuel</span>
        <button onClick={() => update("edgeCurrent", char.edgeCurrent - 1)}>-</button>
        <span>{char.edgeCurrent}</span>
        <button onClick={() => update("edgeCurrent", char.edgeCurrent + 1)}>+</button>
      </div>
    </section>
  );
}
