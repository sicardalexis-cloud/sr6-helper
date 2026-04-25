import React from "react";

interface Props {
  filled: boolean;
}

export default function Diamond({ filled }: Props) {
  return (
    <div
      className="diamond"
      style={{
        backgroundColor: filled ? "#f7d354" : "transparent",
        border: "2px solid #f7d354",
      }}
    />
  );
}
