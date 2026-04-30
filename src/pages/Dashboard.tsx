import StatusBadge from "../components/StatusBadge";
// import { useProducts } from "../hooks/useProducts";
import { useProducts } from "../context/ProductContext";
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  const { products } = useProducts();
  const total = products.length;
  const available = products.filter((p) => p.status === "available").length;
  const sold = products.filter((p) => p.status === "sold").length;
  const reserved = products.filter((p) => p.status === "reserved").length;
  return (
    <div>
      {/* Page heading */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-0">Dashboard</h4>
          <p className="text-muted mb-0" style={{ fontSize: "0.875rem" }}>
            Villakazi Scouts · Income Generation Project
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="row g-3 mb-5">
        <div className="col-6 col-md-3">
          <StatusBadge label="Total Items" value={total} />
        </div>
        <div className="col-6 col-md-3">
          <StatusBadge label="Available" value={available} />
        </div>
        <div className="col-6 col-md-3">
          <StatusBadge label="Sold" value={sold} />
        </div>
        <div className="col-6 col-md-3">
          <StatusBadge label="Reserved" value={reserved} />
        </div>
      </div>

      {/* Available products */}
      <h6
        className="fw-semibold mb-3"
        style={{
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          fontSize: "0.75rem",
          color: "#888",
        }}
      >
        Available Products
      </h6>
      <div className="row g-3">
        {products
          .filter((p) => p.status === "available")
          .map((p) => (
            <div className="col-6 col-md-4 col-lg-3" key={p.id}>
              <div
                className="card h-100 border-0 shadow-sm"
                style={{ borderRadius: "12px", overflow: "hidden", cursor: 'pointer'  }}
                onClick={() => navigate(`/product/${p.id}`)}
              >
                <div
                  style={{
                    height: "140px",
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
                        fontSize: "2.5rem",
                      }}
                    >
                      🪵
                    </div>
                  )}
                </div>
                <div className="card-body p-3">
                  <p
                    className="fw-semibold mb-1"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {p.name}
                  </p>
                  <p className="text-muted mb-2" style={{ fontSize: "0.8rem" }}>
                    {p.type}
                  </p>
                  <p className="fw-bold mb-0" style={{ fontSize: "0.95rem" }}>
                    KES {p.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
