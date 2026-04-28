import React, { useState } from "react";
// import { useProducts } from '../hooks/useProducts'
import { useProducts } from '../context/ProductContext'
import type { Product } from "../data/products";



function AddProduct() {
  const { addProduct } = useProducts()
  const [form, setForm] = useState<Omit<Product, "id">>({
    name: "",
    type: "Chopping Board",
    price: 0,
    status: "available",
    note: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
  if (!form.name.trim()) {
    alert('Please enter a product name')
    return
  }
  addProduct(form)
  setForm({ name: '', type: 'Chopping Board', price: 0, status: 'available', note: '' })
  alert(`Product "${form.name}" added!`)

  };
  return (
    <div className="row">
      <div className="col-md-6">
        <h4 className="mb-4">Add Product</h4>

        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Type</label>
          <select
            name="type"
            className="form-select"
            value={form.type}
            onChange={handleChange}
          >
            <option value="Chopping Board">Chopping Board</option>
            <option value="Key Hanger">Key Hanger</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Price (KES)</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            className="form-select"
            value={form.status}
            onChange={handleChange}
          >
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="in-progress">In Progress</option>
            <option value="sold">Sold</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Note</label>
          <textarea
            name="note"
            className="form-control"
            value={form.note}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-dark w-100" onClick={handleSubmit}>
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
