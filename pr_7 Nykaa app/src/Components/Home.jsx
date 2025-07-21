import { useEffect, useState } from "react";
import { getStorageData, setStorageData } from "../Services/StorageData";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const Home = () => {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    let data = getStorageData();
    let updatedData = data.filter(product => product.id !== id);
    setStorageData(updatedData);
    setProductData(updatedData);
  };

  useEffect(() => {
    let data = getStorageData();
    setProductData(data);
  }, []);

  return (
    <>
      <Container style={{ marginTop: "50px", marginBottom: "50px" }}>
        <Row className="g-4">
          {productData.map((product) => (
            <Col key={product.id} md={4}>
              <Card className="product-card">
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>
                    {product.title} - {product.id}
                  </Card.Title>
                  <Card.Text>{product.desc}</Card.Text>
                  <h6 className="text-pink">MRP : ₹{product.price}</h6>
                  <Badge bg="warning">{product.category}</Badge>
                  <div className="mt-3 d-flex justify-content-between">
                    <Button
                      onClick={() => handleEdit(product.id)}
                      variant="warning">
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(product.id)}
                      variant="danger">
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
