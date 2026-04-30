import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";

const statusColors: Record<string, string> = {
  available: "success",
  sold: "danger",
  reserved: "warning",
  "in-progress": "primary",
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { products, deleteProduct } = useProducts();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="text-center mt-5">
        <p className="text-muted">Product not found.</p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm(`Delete "${product.name}"?`)) {
      deleteProduct(product.id);
      navigate("/products");
    }
  };

  return (
    <div>
      {/* Back button */}
      <button
        className="btn btn-sm mb-4"
        style={{
          background: "none",
          border: "none",
          color: "#888",
          padding: 0,
          fontSize: "0.875rem",
        }}
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="row g-4">
        {/* Images */}
        <div className="col-md-6">
          <div
            style={{
              height: "320px",
              backgroundColor: "#f5f0eb",
              borderRadius: "14px",
              overflow: "hidden",
              marginBottom: "12px",
            }}
          >
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[activeImage]}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "4rem",
                }}
              >
                🪵
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {product.images && product.images.length > 1 && (
            <div className="d-flex gap-2 flex-wrap">
              {product.images.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`thumb ${i}`}
                  onClick={() => setActiveImage(i)}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    cursor: "pointer",
                    border:
                      activeImage === i
                        ? "2px solid #1a1a1a"
                        : "2px solid transparent",
                    opacity: activeImage === i ? 1 : 0.6,
                    transition: "all 0.2s",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="col-md-6">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span
              className={`badge bg-${statusColors[product.status]}`}
              style={{ fontSize: "0.75rem" }}
            >
              {product.status}
            </span>
            <span className="text-muted" style={{ fontSize: "0.8rem" }}>
              {product.type}
            </span>
          </div>

          <h3 className="fw-bold mb-1">{product.name}</h3>
          <h4 className="mb-3" style={{ color: "#1a1a1a" }}>
            KES {product.price.toLocaleString()}
          </h4>

          {product.note && (
            <p
              className="text-muted mb-4"
              style={{ fontSize: "0.9rem", lineHeight: "1.6" }}
            >
              {product.note}
            </p>
          )}

          {/* Admin actions */}
          {isAdmin && (
            <div className="d-flex gap-2 mt-4">
              <button
                className="btn btn-dark btn-sm"
                onClick={() => navigate(`/edit/${product.id}`)}
              >
                Edit Product
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
