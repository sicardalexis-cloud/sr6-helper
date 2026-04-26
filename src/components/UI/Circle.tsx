

interface Props {
  filled: boolean;
}

export default function Circle({ filled }: Props) {
  return (
    <div
      className="circle"
      style={{
        backgroundColor: filled ? "#ffffff" : "transparent",
        border: "2px solid #ffffff",
      }}
    />
  );
}
