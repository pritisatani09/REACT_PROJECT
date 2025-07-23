import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { getStorageData, setStorageData } from "../Services/StorageData";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const intialState = {
    id: "",
    title: "",
    desc: "",
    price: "",
    category: "",
    image: "",
  };
  const [inputForm, setInputForm] = useState(intialState);
  const [formError, setFormError] = useState({});

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!inputForm.title.trim()) errors.title = "Title is required";
    if (!inputForm.desc.trim()) errors.desc = "Description is required";
    if (!inputForm.price || inputForm.price <= 0) errors.price = "Valid price required";
    if (!inputForm.category || inputForm.category === "Select Category") errors.category = "Please select a category";
    if (!inputForm.image.trim()) errors.image = "Image URL is required";

    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }

    let data = getStorageData();
    let updateData = data.map((prod) => (prod.id === id ? inputForm : prod));
    setStorageData(updateData);
    navigate("/");
  };

  useEffect(() => {
    let data = getStorageData();
    let singleRec = data.find((product) => product.id === id);
    setInputForm(singleRec || intialState);
  }, [id]);

  return (
    <Container className="form-container" style={{ marginTop: "50px" }}>
      <Card
        className="p-4 shadow-sm"
        style={{
          maxWidth: "600px",
          width: "100%",
          borderRadius: "20px",
        }}
      >
        <h2 className="mb-4 text-center" style={{ color: "#d63384" }}>
          EDIT PRODUCT
        </h2>
        <Form onSubmit={handleSubmit}>
          {/* Title */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Title</Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter Title"
                value={inputForm.title}
                onChange={handleChanged}
                isInvalid={!!formError.title}
              />
              <Form.Control.Feedback type="invalid">{formError.title}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Description */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Description</Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                name="desc"
                placeholder="Enter Description"
                value={inputForm.desc}
                onChange={handleChanged}
                isInvalid={!!formError.desc}
              />
              <Form.Control.Feedback type="invalid">{formError.desc}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Price */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Price</Form.Label>
            <Col sm="9">
              <Form.Control
                type="number"
                name="price"
                placeholder="Enter Price"
                value={inputForm.price}
                onChange={handleChanged}
                isInvalid={!!formError.price}
              />
              <Form.Control.Feedback type="invalid">{formError.price}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* ✅ Corrected Category Field */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Category</Form.Label>
            <Col sm="9">
              <Form.Select
                name="category"
                value={inputForm.category}
                onChange={handleChanged}
                isInvalid={!!formError.category}
              >
                <option>Select Category</option>
                <option value="MakeUp">MakeUp</option>
                <option value="Skin">Skin</option>
                <option value="Hair">Hair</option>
                <option value="Fragrance">Fragrance</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{formError.category}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Image URL */}
          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm="3">Image URL</Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                name="image"
                placeholder="Enter Image URL"
                value={inputForm.image}
                onChange={handleChanged}
                isInvalid={!!formError.image}
              />
              <Form.Control.Feedback type="invalid">{formError.image}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Submit */}
          <div className="text-center">
            <Button
              type="submit"
              style={{
                backgroundColor: "#d63384",
                border: "none",
                padding: "10px 25px",
                borderRadius: "10px",
              }}
            >
              Update Product
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default EditProduct;
