

interface Props {
  filled: boolean;
  color: "red" | "yellow";
}

export default function MonitorBox({ filled, color }: Props) {
  const borderColor = color === "red" ? "#ff4d4d" : "#f7d354";
  const fillColor = filled ? borderColor : "transparent";

  return (
    <div
      className="monitor-box"
      style={{
        backgroundColor: fillColor,
        border: `2px solid ${borderColor}`,
      }}
    />
  );
}
