import { useState } from "react";
// import { useProducts } from '../hooks/useProducts'
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  const { products, updateProduct, deleteProduct } = useProducts();
  const { isAdmin } = useAuth();
  // const { products } = useProducts()
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const statusColors: Record<string, string> = {
    available: "success",
    sold: "danger",
    reserved: "warning",
    "in-progress": "primary",
  };
  const statusValues = [
    "available",
    "sold",
    "reserved",
    "in-progress",
  ] as const;
  type ProductStatus = (typeof statusValues)[number];
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-0">Products</h4>
          <p className="text-muted mb-0" style={{ fontSize: "0.875rem" }}>
            All Villakazi wood products
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="d-flex gap-2 mb-4 flex-wrap">
        <input
          type="text"
          className="form-control"
          style={{
            maxWidth: "220px",
            borderRadius: "8px",
            fontSize: "0.875rem",
          }}
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select"
          style={{
            maxWidth: "160px",
            borderRadius: "8px",
            fontSize: "0.875rem",
          }}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
          <option value="reserved">Reserved</option>
          <option value="in-progress">In Progress</option>
        </select>
      </div>

      {/* Product cards */}
      <div className="row g-3">
        {products
          .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
          .filter((p) => status === "all" || p.status === status)
          .map((p) => (
            <div className="col-12 col-md-6 col-lg-4" key={p.id}>
              <div
                className="card border-0 h-100"
                style={{
                  borderRadius: "14px",
                  overflow: "hidden",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                }}
              >
                {/* Image */}
                <div
                  style={{
                    height: "180px",
                    backgroundColor: "#f5f0eb",
                    overflow: "hidden",
                  }}
                >
                  {p.images && p.images.length > 0 ? (
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "3rem",
                      }}
                    >
                      🪵
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-start mb-1">
                    <p
                      className="fw-semibold mb-0"
                      style={{ fontSize: "0.95rem" }}
                    >
                      {p.name}
                    </p>
                    {isAdmin ? (
                      <select
                        className={`badge border-0 bg-${statusColors[p.status]}`}
                        style={{ fontSize: "0.7rem", cursor: "pointer" }}
                        value={p.status}
                        onChange={(e) =>
                          updateProduct(p.id, {
                            status: e.target.value as ProductStatus,
                          })
                        }
                      >
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                        <option value="reserved">Reserved</option>
                        <option value="in-progress">In Progress</option>
                      </select>
                    ) : (
                      <span
                        className={`badge bg-${statusColors[p.status]}`}
                        style={{ fontSize: "0.7rem" }}
                      >
                        {p.status}
                      </span>
                    )}
                  </div>

                  <p className="text-muted mb-2" style={{ fontSize: "0.8rem" }}>
                    {p.type}
                  </p>

                  <div className="d-flex justify-content-between align-items-center">
                    <p className="fw-bold mb-0" style={{ fontSize: "1rem" }}>
                      KES {p.price.toLocaleString()}
                    </p>
                    {isAdmin && (
                      <div className="d-flex gap-2 mt-1">
                        <button
                          className="btn btn-sm"
                          style={{
                            fontSize: "0.75rem",
                            color: "#555",
                            background: "none",
                            border: "none",
                            padding: 0,
                          }}
                          onClick={() => navigate(`/edit/${p.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm"
                          style={{
                            fontSize: "0.75rem",
                            color: "#dc3545",
                            background: "none",
                            border: "none",
                            padding: 0,
                          }}
                          onClick={() => {
                            if (confirm(`Delete "${p.name}"?`))
                              deleteProduct(p.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  {p.note && (
                    <p
                      className="text-muted mt-2 mb-0"
                      style={{ fontSize: "0.78rem", fontStyle: "italic" }}
                    >
                      {p.note}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
