import React, { useState } from "react";
// import { useProducts } from '../hooks/useProducts'
import { useProducts } from "../context/ProductContext";
import type { Product } from "../data/products";
import { useAuth } from "../context/AuthContext";
import ImageUpload from "../components/ImageUpload";

function AddProduct() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <div className="text-center mt-5">
        <h5 className="text-muted">
          You don't have permission to access this page.
        </h5>
      </div>
    );
  }
  const { addProduct } = useProducts();
  const [form, setForm] = useState<Omit<Product, "id">>({
    name: "",
    type: "Chopping Board",
    price: 0,
    status: "available",
    note: "",
    images: [] as string[],
    dimensions: { length: 0, width: 0, height: 0 },
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
      alert("Please enter a product name");
      return;
    }
    addProduct(form);
    setForm({
      name: "",
      type: "Chopping Board",
      price: 0,
      status: "available",
      note: "",
      images: [],
      dimensions: { length: 0, width: 0, height: 0 },
    });
    alert(`Product "${form.name}" added!`);
  };
  const handleImageUpload = (url: string) => {
    setForm((prev) => ({ ...prev, images: [...(prev.images ?? []), url] }));
    
  };
  const handleDimension = (e: React.ChangeEvent<HTMLInputElement>) => {
  setForm(prev => ({
    ...prev,
    dimensions: {
      length: prev.dimensions?.length ?? 0,
      width: prev.dimensions?.width ?? 0,
      height: prev.dimensions?.height ?? 0,
      [e.target.name]: Number(e.target.value)
    }
  }))
}
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
        <div className="mb-3">
  <label className="form-label">Dimensions (cm)</label>
  <div className="d-flex gap-2">
    <input
      type="number"
      name="length"
      className="form-control"
      placeholder="Length"
      value={form.dimensions?.length || ''}
      onChange={handleDimension}
    />
    <input
      type="number"
      name="width"
      className="form-control"
      placeholder="Width"
      value={form.dimensions?.width || ''}
      onChange={handleDimension}
    />
    <input
      type="number"
      name="height"
      className="form-control"
      placeholder="Height"
      value={form.dimensions?.height || ''}
      onChange={handleDimension}
    />
  </div>
  <small className="text-muted">Length × Width × Height in centimetres</small>
</div>
        <div className="mb-3">
          <label className="form-label">Product Images</label>
          <ImageUpload onUpload={handleImageUpload} />
          {(form.images ?? []).length > 0 && (
            <div className="d-flex gap-2 flex-wrap mt-2">
              {(form.images ?? []).map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`preview ${i}`}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <button className="btn btn-dark w-100" onClick={handleSubmit}>
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
