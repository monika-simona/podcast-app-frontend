import React, { useEffect, useState } from "react";
import api from "../api";
import Button from "./Button";

function TagList({ onTagClick }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await api.get("/tags");
        setTags(res.data);
      } catch (err) {
        console.error("Greška pri učitavanju svih tagova:", err);
      }
    };
    fetchTags();
  }, []);

  return (
    <div style={{ margin: "20px 0" }}>
      <h3>Popularni tagovi</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {tags.map((tag) => (
          <Button
            key={tag.id}
            onClick={() => onTagClick(tag)}
            style={{
              background: "#f3f3f3",
              borderRadius: "20px",
              padding: "5px 12px",
            }}
          >
            #{tag.name} ({tag.episodes_count})
          </Button>
        ))}
      </div>
    </div>
  );
}

export default TagList;
