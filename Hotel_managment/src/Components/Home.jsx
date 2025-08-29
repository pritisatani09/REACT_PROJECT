import { Button, Card, Col, Container, Row, Spinner, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { BsXCircle, BsArrowCounterclockwise } from "react-icons/bs";
import api from "../api"; // axios instance
import { useSelector } from "react-redux"; // 🔹 login state
import "../App.css";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 3;
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.authReducer); // 🔹 logged in user

  // fetch all rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get("/rooms");
        setRooms(res.data);
      } catch (err) {
        toast.error("Failed to load rooms");
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleView = (id) => navigate(`/view/${id}`);

  const handleEdit = (id) => {
    if (!user) {
      toast.warning("Please sign in to edit room!");
      navigate("/sign-in");
      return;
    }
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!user) {
      toast.warning("Please sign in to delete room!");
      navigate("/sign-in");
      return;
    }
    try {
      await api.delete(`/rooms/${id}`);
      setRooms((prev) => prev.filter((room) => room.id !== id));
      toast.success("Room deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete room.");
    }
  };

  // Filter + Sort
  const filteredRooms = rooms.filter(
    (room) =>
      room.number.toString().includes(search.toLowerCase()) ||
      room.category.toLowerCase().includes(search.toLowerCase()) ||
      room.desc.toLowerCase().includes(search.toLowerCase())
  );

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (sort === "low-high") return a.price - b.price;
    if (sort === "high-low") return b.price - a.price;
    return 0;
  });

  // Pagination
  const indexOfLast = currentPage * roomsPerPage;
  const indexOfFirst = indexOfLast - roomsPerPage;
  const currentRooms = sortedRooms.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedRooms.length / roomsPerPage);

  return (
    <>
      <ToastContainer position="top-center" autoClose={2500} theme="colored" />
      <Container fluid className="py-5">
        {/* Search + Sort Controls */}
        <Row className="mb-4 px-3">
          <Col md={6} className="mb-2 d-flex align-items-center">
            <Form.Control
              type="text"
              placeholder="Search by room number, category or description..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            {search && (
              <Button
                variant="outline-secondary"
                size="sm"
                className="ms-2 d-flex align-items-center"
                onClick={() => {
                  setSearch("");
                  setCurrentPage(1);
                }}
              >
                <BsXCircle className="me-1" /> Clear
              </Button>
            )}
          </Col>
          <Col md={3} className="mb-2 d-flex align-items-center">
            <Form.Select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">Sort by</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </Form.Select>
            {sort && (
              <Button
                variant="outline-secondary"
                size="sm"
                className="ms-2 d-flex align-items-center"
                onClick={() => {
                  setSort("");
                  setCurrentPage(1);
                }}
              >
                <BsArrowCounterclockwise className="me-1" /> Reset
              </Button>
            )}
          </Col>
        </Row>

        {/* Room Cards */}
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row className="g-3 mx-3">
            {currentRooms.length > 0 ? (
              currentRooms.map((room) => (
                <Col xs={12} md={4} key={room.id}>
                  <Card className="hotel-card h-100 position-relative card-hover-group">
                    <div
                      className="room-img-wrap"
                      onClick={() => handleView(room.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <Card.Img
                        src={room.image}
                        alt={room.number}
                        className="product-img"
                      />
                    </div>
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <div
                        onClick={() => handleView(room.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <Card.Title className="room-number">
                          Room {room.number}
                        </Card.Title>
                        <Card.Text className="text-muted small mb-1">
                          {room.desc}
                        </Card.Text>
                        <Card.Text className="text-muted small mb-1">
                          <strong>Category:</strong> {room.category}
                        </Card.Text>
                        <Card.Text className="text-muted small mb-1">
                          <strong>Bed:</strong> {room.bed}
                        </Card.Text>
                        <div className="fw-bold text-success mb-2">
                          ₹{room.price}
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleView(room.id)}
                          className="px-3 py-2"
                        >
                          <FaEye />
                        </Button>
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => handleEdit(room.id)}
                          className="px-3 py-2"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(room.id)}
                          className="px-3 py-2"
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center">No rooms available</p>
            )}
          </Row>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="outline-primary"
              size="sm"
              className="me-2"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <span className="align-self-center">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline-primary"
              size="sm"
              className="ms-2"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </Container>
    </>
  );
};

export default Home;
