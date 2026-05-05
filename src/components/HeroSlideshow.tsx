import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../data/products";

interface HeroSlideshowProps {
  products: Product[];
}

const HeroSlideshow = ({ products }: HeroSlideshowProps) => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const slides = products.filter((p) => p.images && p.images.length > 0);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) {
    return (
      <div
        style={{
          height: "420px",
          backgroundColor: "#f5f0eb",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <span style={{ fontSize: "3rem" }}>🪵</span>
        <p className="text-muted" style={{ fontSize: "0.875rem" }}>
          No products with images yet
        </p>
      </div>
    );
  }

  const slide = slides[current];

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <div
      style={{
        position: "relative",
        height: "420px",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/product/${slide.id}`)}
    >
      {/* Background image */}
      <img
        src={slide.images![0]}
        alt={slide.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)",
        }}
      />

      {/* Product info */}
      <div
        style={{
          position: "absolute",
          bottom: "28px",
          left: "28px",
          right: "80px",
          color: "white",
        }}
      >
        <span
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "1px",
            opacity: 0.8,
          }}
        >
          {slide.type}
        </span>
        <h2 className="fw-bold mb-1" style={{ fontSize: "1.6rem" }}>
          {slide.name}
        </h2>
        <p className="mb-1" style={{ fontSize: "1rem", opacity: 0.9 }}>
          KES {slide.price.toLocaleString()}
        </p>
        {slide.dimensions && (
          <p style={{ fontSize: "0.78rem", opacity: 0.7, margin: 0 }}>
             {slide.dimensions.length} × {slide.dimensions.width} ×{" "}
            {slide.dimensions.height} cm
          </p>
        )}
        {slide.note && (
          <p
            style={{
              fontSize: "0.8rem",
              opacity: 0.75,
              marginTop: "4px",
              marginBottom: 0,
            }}
          >
            {slide.note}
          </p>
        )}
      </div>

      {/* Arrow controls */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        style={{
          position: "absolute",
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.15)",
          border: "none",
          borderRadius: "50%",
          width: "36px",
          height: "36px",
          color: "white",
          fontSize: "1rem",
          cursor: "pointer",
          backdropFilter: "blur(4px)",
        }}
      >
        ‹
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        style={{
          position: "absolute",
          right: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.15)",
          border: "none",
          borderRadius: "50%",
          width: "36px",
          height: "36px",
          color: "white",
          fontSize: "1rem",
          cursor: "pointer",
          backdropFilter: "blur(4px)",
        }}
      >
        ›
      </button>

      {/* Dot indicators */}
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          right: "20px",
          display: "flex",
          gap: "6px",
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setCurrent(i);
            }}
            style={{
              width: i === current ? "20px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: "white",
              border: "none",
              opacity: i === current ? 1 : 0.4,
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlideshow;
