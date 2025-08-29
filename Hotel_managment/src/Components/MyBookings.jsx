import React, { useEffect, useState } from "react";
import { Container, Card, Spinner, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "../App.css";

const API_URL = "http://localhost:5000"; // JSON Server URL

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/reservations`);
      setBookings(res.data); // assuming reservations array in db.json
    } catch (err) {
      console.error("Error fetching bookings", err);
      toast.error("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (bookingId) => {
    try {
      await axios.delete(`${API_URL}/reservations/${bookingId}`);
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      toast.success("Booking removed successfully!");
    } catch (err) {
      console.error("Remove failed", err);
      toast.error("Failed to remove booking.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (bookings.length === 0) {
    return <p className="text-center mt-5">You have no bookings yet.</p>;
  }

  return (
    <Container className="py-4">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <h3 className="mb-4 text-center" style={{ color: "#b89d5b", fontWeight: "bold" }}>
        My Bookings
      </h3>
      <Row>
        {bookings.map((booking) => (
          <Col md={6} lg={4} key={booking.id}>
            <Card className="mb-4 shadow-sm border-0" style={{ background: "#fffdf7", borderRadius: "15px" }}>
              <Card.Body>
                <Card.Title style={{ color: "#a67c2d" }}>Booking ID: {booking.bookingId}</Card.Title>
                <Card.Text style={{ fontSize: "0.95rem", color: "#5c4b27" }}>
                  <strong>Guest:</strong> {booking.name} <br />
                  <strong>Check-In:</strong> {booking.checkIn} <br />
                  <strong>Check-Out:</strong> {booking.checkOut} <br />
                  <strong>Total:</strong> ₹{booking.totalPayable}
                </Card.Text>
                <div className="d-grid">
                  <Button className="taj-remove-btn" onClick={() => handleRemove(booking.id)}>
                    Remove Booking
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyBookings;
