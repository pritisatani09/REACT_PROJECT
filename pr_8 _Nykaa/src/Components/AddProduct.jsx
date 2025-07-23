import generateUniqueId from "generate-unique-id";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { getStorageData, setStorageData } from "../Services/StorageData";

const AddProduct = () => {
  const navigate = useNavigate();
  const initialState = {
    title: "",
    desc: "",
    price: "",
    category: "",
    image: "",
  };

  const [inputForm, setInputForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });

    // Remove error message on change
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!inputForm.title.trim()) newErrors.title = "Please enter title";
    if (!inputForm.desc.trim()) newErrors.desc = "Please enter description";
    if (!inputForm.price.trim()) newErrors.price = "Please enter price";
    if (!inputForm.category.trim()) newErrors.category = "Please select category";
    if (!inputForm.image.trim()) newErrors.image = "Please enter image URL";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const id = generateUniqueId({ length: 6, useLetters: false });
    const newProduct = { ...inputForm, id };
    const data = getStorageData();
    data.push(newProduct);
    setStorageData(data);
    navigate("/");
  };

  return (
    <Container className="form-container" style={{ marginTop: "50px", marginBottom: "50px" }}>
      <Card className="p-4 shadow-sm">
        <h2 className="mb-4 text-center text-pink">ADD PRODUCT</h2>
        <Form onSubmit={handleSubmit}>
          {/* Title */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Title</Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Enter Title"
                name="title"
                value={inputForm.title}
                onChange={handleChanged}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Description */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Description</Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Enter Description"
                name="desc"
                value={inputForm.desc}
                onChange={handleChanged}
                isInvalid={!!errors.desc}
              />
              <Form.Control.Feedback type="invalid">{errors.desc}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Price */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Price</Form.Label>
            <Col sm="9">
              <Form.Control
                type="number"
                placeholder="Enter Price"
                name="price"
                value={inputForm.price}
                onChange={handleChanged}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Category */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Category</Form.Label>
            <Col sm="9">
              <Form.Select
                name="category"
                value={inputForm.category}
                onChange={handleChanged}
                isInvalid={!!errors.category}
              >
                <option value="">Select Category</option>
                <option value="MakeUp">MakeUp</option>
                <option value="Skin">Skin</option>
                <option value="Hair">Hair</option>
                <option value="Fragrance">Fragrance</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Image URL */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Image URL</Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Enter Image URL"
                name="image"
                value={inputForm.image}
                onChange={handleChanged}
                isInvalid={!!errors.image}
              />
              <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <div className="text-center">
            <Button type="submit">Add Product</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default AddProduct;
