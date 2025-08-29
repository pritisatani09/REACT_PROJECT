import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import generateUniqueId from "generate-unique-id";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import "../App.css";

const AddRoom = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducer);

  const initialState = {
    id: "",
    number: "",
    desc: "",
    category: "",
    bed: "",
    price: "",
    image: "",
  };

  const [inputForm, setInputForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) {
      toast.warning("Please sign in to add a room!");
      setTimeout(() => navigate("/sign-in"), 1500);
    }
  }, [user, navigate]);

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const { number, desc, category, bed, price, image } = inputForm;
    const newErrors = {};
    if (!number) newErrors.number = "Room Number is required.";
    if (!desc) newErrors.desc = "Description is required.";
    if (!category) newErrors.category = "Category must be selected.";
    if (!bed) newErrors.bed = "Bed Type must be selected.";
    if (!price) newErrors.price = "Price must be a positive number.";
    if (!image) newErrors.image = "Image URL is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      toast.error("Please fix the form errors.");
      return;
    }

    const id = generateUniqueId({ length: 6, useLetters: false });
    const newRoom = { ...inputForm, id };

    try {
      const res = await fetch("http://localhost:3000/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRoom),
      });
      if (!res.ok) throw new Error("Failed to add room");

      toast.success("🎉 Room added successfully!");
      setInputForm(initialState);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      toast.error("Error while adding room.");
      console.error(err);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      {user && (
        <Card className="add-product-card w-100" style={{ maxWidth: "600px" }}>
          <h3 className="text-center text-primary mb-4 fw-bold">Add a New Room</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Room Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Room Number"
                name="number"
                value={inputForm.number}
                onChange={handleChanged}
              />
              {errors.number && <small className="text-danger">{errors.number}</small>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Room Description"
                name="desc"
                value={inputForm.desc}
                onChange={handleChanged}
              />
              {errors.desc && <small className="text-danger">{errors.desc}</small>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Room Price"
                name="price"
                value={inputForm.price}
                onChange={handleChanged}
              />
              {errors.price && <small className="text-danger">{errors.price}</small>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select name="category" value={inputForm.category} onChange={handleChanged}>
                <option value="">Select Category</option>
                <option value="AC">AC</option>
                <option value="NON AC">NON AC</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Luxury">Luxury</option>
              </Form.Select>
              {errors.category && <small className="text-danger">{errors.category}</small>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bed Type</Form.Label>
              <Form.Select name="bed" value={inputForm.bed} onChange={handleChanged}>
                <option value="">Select Bed</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
              </Form.Select>
              {errors.bed && <small className="text-danger">{errors.bed}</small>}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image URL"
                name="image"
                value={inputForm.image}
                onChange={handleChanged}
              />
              {errors.image && <small className="text-danger">{errors.image}</small>}
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Add Room
              </Button>
            </div>
          </Form>
        </Card>
      )}
    </Container>
  );
};

export default AddRoom;
