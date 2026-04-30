import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import ImageUpload from "../components/ImageUpload";

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { products, updateProduct } = useProducts();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);

  const [form, setForm] = useState({
    name: "",
    type: "",
    price: 0,
    status: "",
    note: "",
    images: [] as string[],
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        type: product.type,
        price: product.price,
        status: product.status,
        note: product.note,
        images: product.images ?? [],
      });
    }
  }, [product]);

  if (!isAdmin) {
    return (
      <div className="text-center mt-5">
        <h5 className="text-muted">
          You don't have permission to access this page.
        </h5>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-5">
        <h5 className="text-muted">Product not found.</h5>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (url: string) => {
    setForm((prev) => ({ ...prev, images: [...(prev.images ?? []), url] }));
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      alert("Please enter a product name");
      return;
    }
    await updateProduct(id!, form);
    navigate("/products");
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h4 className="fw-bold mb-4">Edit Product</h4>

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
          <label className="form-label">Images</label>
          <ImageUpload onUpload={handleImageUpload} />
          {form.images.length > 0 && (
            <div className="d-flex gap-2 flex-wrap mt-2">
              {form.images.map((url, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <img
                    src={url}
                    alt={`product ${i}`}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <button
                    onClick={() => removeImage(i)}
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "-6px",
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      fontSize: "0.7rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-dark" onClick={handleSubmit}>
            Save Changes
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/products")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
