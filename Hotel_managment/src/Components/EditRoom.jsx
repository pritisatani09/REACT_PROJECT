import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../api";
import { useSelector } from "react-redux";
import "../App.css";

const EditRoom = () => {
  const { id } = useParams();
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
      toast.warning("Please sign in to edit a room!");
      setTimeout(() => navigate("/sign-in"), 1500);
    }
  }, [user, navigate]);

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
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

    try {
      await api.put(`/rooms/${id}`, inputForm);
      toast.success("Room updated successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      toast.error("Failed to update room.");
    }
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await api.get(`/rooms/${id}`);
        setInputForm(res.data);
      } catch (err) {
        toast.error("Failed to fetch room details");
      }
    };
    if (id) fetchRoom();
  }, [id]);

  return (
    <Container className="edit-container mt-5 p-4 shadow rounded bg-white" style={{ width: "700px" }}>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      {user && (
        <>
          <h2 className="text-primary fw-bold text-center mb-4">Edit Room</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Room Number</Form.Label>
              <Form.Control
                type="text"
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
                name="image"
                value={inputForm.image}
                onChange={handleChanged}
              />
              {errors.image && <small className="text-danger">{errors.image}</small>}
              {inputForm.image && (
                <div className="mt-2">
                  <img src={inputForm.image} alt="Room" style={{ maxHeight: "150px" }} />
                </div>
              )}
            </Form.Group>

            <div className="text-center">
              <Button type="submit" variant="primary">
                Update Room
              </Button>
            </div>
          </Form>
        </>
      )}
    </Container>
  );
};

export default EditRoom;
