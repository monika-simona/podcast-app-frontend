import React, { useState } from "react";

function EpisodeDescription({ text, maxLength = 120 }) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const isLong = text.length > maxLength;
  const displayText =
    !expanded && isLong ? text.slice(0, maxLength) + "..." : text;

  return (
    <p style={{ margin: 0 }}>
      {displayText}{" "}
      {isLong && (
        <span
          onClick={() => setExpanded(!expanded)}
          style={{ color: "blue", cursor: "pointer", userSelect: "none" }}
        >
          {expanded ? "Collapse" : "Read more"}
        </span>
      )}
    </p>
  );
}

export default EpisodeDescription;
