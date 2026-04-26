

const attrs = ["BOD", "AGI", "REA", "STR", "WIL", "LOG", "INT", "CHA", "MAGIC", "ESSENCE"];

interface Props {
  char: any;
  update: (fn: (draft: any) => void) => void;
}

export default function AttributesPanel({ char, update }: Props) {
  const attributes = char.attributes || {};

  const handleChange = (key: string, delta: number) => {
    update((draft: any) => {
      if (!draft.attributes) draft.attributes = {};
      
      const current = draft.attributes[key] ?? (key === "MAGIC" ? 0 : 3);
      const newValue = Math.max(0, Math.min(10, current + delta));
      
      draft.attributes[key] = newValue;
    });
  };

  return (
    <div className="attributes-grid">
      {attrs.map((label) => {
        const value = attributes[label] ?? (label === "MAGIC" ? 0 : 3);
        return (
          <div key={label} className="attribute-box">
            <div className="attr-label">{label}</div>
            <div className="attr-value">{value}</div>
            <div className="attr-controls">
              <button 
                className="attr-btn minus"
                onClick={(e) => {
                  e.stopPropagation();   // ← Protection supplémentaire
                  handleChange(label, -1);
                }}
              >
                -
              </button>
              <button 
                className="attr-btn plus"
                onClick={(e) => {
                  e.stopPropagation();
                  handleChange(label, 1);
                }}
              >
                +
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}