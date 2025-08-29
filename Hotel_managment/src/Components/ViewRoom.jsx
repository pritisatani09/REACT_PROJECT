import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  Spinner,
  Button,
  ListGroup,
  Badge,
  Card,
} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import api from "../api";
import "../App.css";

const ViewRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await api.get(`/rooms/${id}`);
        setRoom(res.data);
      } catch (err) {
        console.error("Failed to fetch room:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchRoom();
  }, [id]);

  const handleBookNow = () => {
    navigate("/booking-form");
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="text-center my-5">
        <p>Room not found.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <Container className="py-4">
      <Card className="p-4 shadow-sm bg-light rounded-4 room-detail-card">
        <Card.Body>
          <Row className="gx-5 gy-4">
            <Col xs={12} md={4} className="text-center">
              <Link to="/" className="btn back-home-btn mb-3">
                <FaArrowLeft /> Back to Home
              </Link>

              {/* ✅ Only use room.image as URL */}
              <Image
                src={room.image}
                alt={room.number}
                fluid
                className="border mb-3"
                style={{ maxHeight: "400px", objectFit: "contain" }}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />

              <Button className="w-100 fw-bold booking-btn" onClick={handleBookNow}>
                Book Now
              </Button>
            </Col>

            <Col xs={12} md={8}>
              <h3 className="text-start room-title">{room.number}</h3>
              <p className="text-muted text-start room-category">{room.category}</p>
              <p className="text-muted text-start room-desc">{room.desc}</p>
              <p className="text-muted text-start room-desc">Bed Type: {room.bed}</p>

              <div className="d-flex align-items-center gap-2 mb-2">
                <Badge bg="success">4.1 ★</Badge>
                <span className="text-muted">(42,000+ Ratings)</span>
              </div>

              <h4 className="text-success text-start room-price">
                ₹{room.price}{" "}
                <small className="text-muted text-decoration-line-through">
                  ₹{Math.floor(room.price * 2)}
                </small>{" "}
                <span className="text-danger">50% off</span>
              </h4>

              <ListGroup variant="flush" className="my-3 text-start">
                <ListGroup.Item>
                  <strong>Memorable Stays - 20% Savings on Breakfast Inclusive Stays</strong>
                </ListGroup.Item>
                <ListGroup.Item>20% Savings on Breakfast-inclusive Stays</ListGroup.Item>
                <ListGroup.Item>Daily Breakfast at Designated Dining Venue</ListGroup.Item>
                <ListGroup.Item>20% Savings on Food & Beverages at Restaurants during the Stay</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewRoom;
