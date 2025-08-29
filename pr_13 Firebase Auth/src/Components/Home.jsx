import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoomAsync, getAllRoomsAsync } from "../Services/Actions/roomAction";
import { Button, Container, Row, Col, Spinner, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import { IoSearch, IoCloseCircle } from "react-icons/io5";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { rooms, isLoading } = useSelector((state) => state.roomReducer);
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 3; // 👈 ek page par 3 card

  useEffect(() => {
    dispatch(getAllRoomsAsync());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(rooms);
  }, [rooms]);

  const handleEdit = (id) => {
    if (!user) return navigate("/signIn");
    navigate(`/edit-room/${id}`);
  };

  const handleDelete = (id) => {
    if (!user) return navigate("/signIn");
    dispatch(deleteRoomAsync(id));
  };

  const handleView = (id) => navigate(`/room/${id}`);

  // 🔍 Search
  const handleSearch = () => {
    const q = search.trim().toLowerCase();
    let filtered = rooms.filter((room) =>
      room.title.toLowerCase().includes(q) ||
      room.desc?.toLowerCase().includes(q) ||
      String(room.price).includes(q) ||
      room.category?.toLowerCase().includes(q)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSearch("");
    setFilteredData(rooms);
    setCurrentPage(1);
  };

  const handleClearSort = () => setSortOption("");

  // 🔽 Sort
  let sortedRooms = [...filteredData];
  if (sortOption === "priceLowHigh") {
    sortedRooms.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighLow") {
    sortedRooms.sort((a, b) => b.price - a.price);
  } else if (sortOption === "nameAZ") {
    sortedRooms.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "nameZA") {
    sortedRooms.sort((a, b) => b.title.localeCompare(a.title));
  }

  // 📑 Pagination
  const totalPages = Math.ceil(sortedRooms.length / roomsPerPage);
  const startIndex = (currentPage - 1) * roomsPerPage;
  const currentRooms = sortedRooms.slice(startIndex, startIndex + roomsPerPage);

  const changePage = (pageNum) => setCurrentPage(pageNum);

  return (
    <Container className="my-4 page-wrapper">
      {/* Header */}
      <div className="list-header">
        <h2 className="page-title text-center">ROOM LISTING</h2>

        <Row className="w-100 g-3 align-items-stretch">
          {/* SEARCH */}
          <Col xs={12} md={6}>
            <Form
              className="ps-search"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <InputGroup className="ps-search-group">
                <button type="button" className="ps-search-icon" onClick={handleSearch}>
                  <IoSearch className="fs-5" />
                </button>
                <Form.Control
                  type="text"
                  placeholder="Search by title, price or category"
                  className="ps-search-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type="button" className="ps-clear-icon" onClick={handleClear}>
                  <IoCloseCircle className="fs-5" />
                </button>
              </InputGroup>
            </Form>
          </Col>

          {/* SORT */}
          <Col xs={12} md={6} className="d-flex">
            <div className="sort-controls ms-md-auto w-100 d-flex align-items-center justify-content-md-end">
              <Form.Select
                className="sort-dropdown"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="nameAZ">Name: A to Z</option>
                <option value="nameZA">Name: Z to A</option>
              </Form.Select>
              <Button className="clear-btn ms-2" onClick={handleClearSort}>
                Clear
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      {/* Room Listing */}
      {isLoading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : (
        <>
          <Row className="g-4">
            {currentRooms.length > 0 ? (
              currentRooms.map((room) => (
                <Col md={4} sm={6} xs={12} key={room.id}>
                  <div className="product-card">
                    <img src={room.image} alt={room.title} className="product-img" />
                    <h5 className="product-title">{room.title}</h5>
                    <div className="product-desc">{room.desc}</div>
                    <div className="product-meta">{room.category}</div>
                    <div className="product-price">₹{room.price}</div>
                    <div className="edit-delete-btns">
                      <Button size="sm" className="view-btn" onClick={() => handleView(room.id)}>View</Button>
                      <Button size="sm" className="edit-btn" onClick={() => handleEdit(room.id)}>Edit</Button>
                      <Button size="sm" className="delete-btn" onClick={() => handleDelete(room.id)}>Delete</Button>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <p className="text-center text-muted">No rooms found.</p>
            )}
          </Row>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="page-btn"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    className={`page-btn ${currentPage === pageNum ? "active" : ""}`}
                    onClick={() => changePage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="page-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
