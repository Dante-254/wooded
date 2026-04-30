import { useState } from "react";
// import { useProducts } from '../hooks/useProducts'
import { useProducts } from '../context/ProductContext'
import { useAuth } from '../context/AuthContext'



const ProductList = () => {
  const { products, updateProduct, deleteProduct } = useProducts()
  const { isAdmin } = useAuth()
  // const { products } = useProducts()
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const statusColors: Record<string, string> = {
    available: "success",
    sold: "danger",
    reserved: "warning",
    "in-progress": "primary",
  };
  const statusValues = ["available", "sold", "reserved", "in-progress"] as const
  type ProductStatus = typeof statusValues[number]
  return (
    <div>
      <h4>Products</h4>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="form-select mb-3"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="all">status</option>
        {statusValues.map(status => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Status</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {products
  .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  .filter(p => status === 'all' || p.status === status)
  .map(p => (
    <tr key={p.id}>
      <td className="fw-medium">{p.name}</td>
      <td className="text-muted">{p.type}</td>
      <td>KES {p.price.toLocaleString()}</td>
      <td>
        {isAdmin ? (
          <select
            className={`badge bg-${statusColors[p.status]} border-0`}
            value={p.status}
            onChange={e => updateProduct(p.id, { status: e.target.value as ProductStatus })}
          >
            {statusValues.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        ) : (
          <span className={`badge bg-${statusColors[p.status]}`}>
            {p.status}
          </span>
        )}
      </td>
      <td>
        {isAdmin && (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              if (confirm(`Delete "${p.name}"?`)) deleteProduct(p.id)
            }}
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
