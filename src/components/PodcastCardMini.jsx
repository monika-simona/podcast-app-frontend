import React from "react";

function PodcastCardMini({ podcast, onClick }) {
  return (
    <div 
      onClick={() => onClick?.(podcast.id)}
      style={{
        width: "120px",
        cursor: "pointer",
        textAlign: "center",
        margin: "5px"
      }}
    >
      <img 
        src={podcast.cover_image_url || "/default-cover.png"} 
        alt={podcast.title} 
        style={{ 
          width: "120px", 
          height: "120px",
          objectFit: "cover",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
        }} 
      />
      <div 
        style={{ 
          marginTop: "6px", 
          fontSize: "14px", 
          fontWeight: "500", 
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}
      >
        {podcast.title}
        </div>
    </div>
  );
}

export default PodcastCardMini;
