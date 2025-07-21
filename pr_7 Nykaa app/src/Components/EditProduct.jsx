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

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <Container
      className="form-container"
      style={{marginTop:"50px"}}
    >
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
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Title
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter Title"
                value={inputForm.title}
                onChange={handleChanged}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Description
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                name="desc"
                placeholder="Enter Description"
                value={inputForm.desc}
                onChange={handleChanged}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Price
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="number"
                name="price"
                placeholder="Enter Price"
                value={inputForm.price}
                onChange={handleChanged}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Category
            </Form.Label>
            <Col sm="9">
              <Form.Select
                name="category"
                value={inputForm.category}
                onChange={handleChanged}
              >
                <option>Select Category</option>
                  <option value="MakeUp" selected={inputForm.category === "MakeUp"}>
                    MakeUp
                  </option>
                  <option value="Skin" selected={inputForm.category === "Skin"}>
                    Skin
                  </option>
                  <option value="Hair" selected={inputForm.category === "Hair"}>
                    Hair
                  </option>
                  <option value="Fragrance" selected={inputForm.category === "Fragrance"}>
                    Fragrance
                  </option>            
                  </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm="3">
              Image URL
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                name="image"
                placeholder="Enter Image URL"
                value={inputForm.image}
                onChange={handleChanged}
              />
            </Col>
          </Form.Group>

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
