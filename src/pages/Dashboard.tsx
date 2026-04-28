import StatusBadge from "../components/StatusBadge";
// import { useProducts } from "../hooks/useProducts";
import { useProducts } from '../context/ProductContext'

function Dashboard() {
   const { products } = useProducts();
  const total = products.length;
  const available = products.filter((p) => p.status === "available").length;
  const sold = products.filter((p) => p.status === "sold").length;
  const reserved = products.filter((p) => p.status === "reserved").length;
  return (
    <div className="container-fluid mt-4">
      <div className="row g-3">
        <div className="col-6 col-md-3">
          <StatusBadge
            label="Available Products"
            value={available}
            color="success"
            icon="✅"
          />
        </div>
        <div className="col-6 col-md-3">
          <StatusBadge
            label="Total Products"
            value={total}
            color="primary"
            icon="📦"
          />
        </div>
        <div className="col-6 col-md-3">
          <StatusBadge
            label="Total Sales"
            value={sold}
            color="success"
            icon="💰"
          />
        </div>

        <div className="col-6 col-md-3">
          <StatusBadge
            label="Pending Orders"
            value={reserved}
            color="warning"
            icon="⏳"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
