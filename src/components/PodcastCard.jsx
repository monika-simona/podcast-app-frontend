import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

function PodcastCard({ podcast, userRole, onViewDetails, onEdit, onDelete }) {
  const placeholder = "/default-cover.png";
  const cardWidth = 220; // kartica je šira od cover-a
  const coverWidth = 200; // cover manji, centriran

  return (
    <div
      className="podcast-card"
      style={{
        width: `${cardWidth}px`,
        cursor: "pointer",
        textAlign: "center",
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px", // prostor oko cover-a
        boxSizing: "border-box",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
      onClick={() => onViewDetails(podcast.id)}
    >
      {/* Cover image */}
      <div
        style={{
          width: `${coverWidth}px`,
          height: "200px",
          overflow: "hidden",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      >
        <img
          src={podcast.cover_image_url || placeholder}
          alt={podcast.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* Naslov */}
      <h3
        style={{
          fontSize: "16px",
          fontWeight: "600",
          marginBottom: "4px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "100%",
        }}
      >
        {podcast.title}
      </h3>

      {/* Autor */}
      <p
        style={{
          fontSize: "14px",
          marginBottom: "6px",
          color: "#555",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "100%",
        }}
      >
        {podcast.author}
      </p>

      {/* Description */}
      <p
        style={{
          fontSize: "13px",
          color: "#666",
          height: "40px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          width: "100%",
        }}
      >
        {podcast.description}
      </p>

      {/* Akcije */}
      {(userRole === "author" || userRole === "admin") && (
        <div
          className="podcast-actions"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "8px",
            width: "100%",
          }}
          onClick={(e) => e.stopPropagation()} // sprečava klik na celu karticu
        >
          <CiEdit
            style={{ cursor: "pointer", fontSize: "20px" }}
            onClick={() => onEdit(podcast)}
          />
          <MdOutlineDelete
            style={{ cursor: "pointer", fontSize: "20px" }}
            onClick={() => onDelete(podcast.id)}
          />
        </div>
      )}
    </div>
  );
}

export default PodcastCard;
