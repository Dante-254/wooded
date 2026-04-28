import { useState } from "react";
// import { useProducts } from '../hooks/useProducts'
import { useProducts } from '../context/ProductContext'



const ProductList = () => {
  const { products } = useProducts()
  // const { products } = useProducts()
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const statusColors: Record<string, string> = {
    available: "success",
    sold: "danger",
    reserved: "warning",
    "in-progress": "primary",
  };
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
        <option value="available">Available</option>
        <option value="sold">Sold</option>
        <option value="reserved">Reserved</option>
        <option value="in-progress">In Progress</option>
      </select>
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
            .filter((p) => status === "all" || p.status === status)
            .map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.type}</td>
                <td>KES {p.price}</td>
                <td>
                  <span className={`badge bg-${statusColors[p.status]}`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
