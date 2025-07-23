import { useEffect, useState } from "react";
import { getStorageData, setStorageData } from "../Services/StorageData";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const Home = () => {
  const [productData, setProductData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortData, setSortData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    let data = getStorageData();
    let updateData = data.filter((product) => product.id !== id);
    setStorageData(updateData);
    setProductData(updateData);
    const totalPages = Math.ceil(updateData.length / itemsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  };

  const handleChanged = (e) => {
    setSearch(e.target.value);
  };

  const handleClear = () => {
    let data = getStorageData();
    setProductData(data);
    setCurrentPage(1);
  };

  const handleSorting = () => {
    let data = getStorageData();
    let updateData;
    let [field, type] = sortData.split(",");
    if (type === "asc" && field !== "price") {
      updateData = data.sort((a, b) => a[field].localeCompare(b[field]));
    } else if (type === "asc" && field === "price") {
      updateData = data.sort((a, b) => a[field] - b[field]);
    } else if (type === "desc" && field !== "price") {
      updateData = data.sort((a, b) => b[field].localeCompare(a[field]));
    } else if (type === "desc" && field === "price") {
      updateData = data.sort((a, b) => b[field] - a[field]);
    }
    setProductData(updateData);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    let data = getStorageData();
    let updateData = data.filter(
      (prod) =>
        prod.title === search ||
        prod.price === search ||
        prod.category === search
    );
    setProductData(updateData);
    setSearch("");
    setCurrentPage(1);
  };

  useEffect(() => {
    let data = getStorageData();
    setProductData(data);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productData.length / itemsPerPage);

  return (
    <>
      <Container className="my-4 mt-5">
        <div className="custom-controls">
          <input
            type="text"
            name="search"
            value={search}
            onChange={handleChanged}
            placeholder="Search by name, price or category"
            className="custom-input"
          />
          <button className="custom-button" onClick={handleSearch}>Search</button>
          <button className="custom-button" onClick={handleClear}>Clear</button>

          <select
            name="sortData"
            value={sortData}
            onChange={(e) => setSortData(e.target.value)}
            className="custom-select"
          >
            <option value="">Select Sorting</option>
            <option value={"title,asc"}>Name - A to Z</option>
            <option value={"title,desc"}>Name - Z to A</option>
            <option value={"price,asc"}>Price - Low to High</option>
            <option value={"price,desc"}>Price - High to Low</option>
            <option value={"category,asc"}>Category - A to Z</option>
            <option value={"category,desc"}>Category - Z to A</option>
          </select>
          <button className="custom-button" onClick={handleSorting}>Sort</button>
        </div>

        {/* Product Cards */}
        <Row className="g-4">
          {currentItems.map((product) => (
            <Col key={product.id} md={4}>
              <Card className="product-card h-100">
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>
                    {product.title} - {product.id}
                  </Card.Title>
                  <Card.Text>{product.desc}</Card.Text>
                  <h6 className="text-pink">MRP : ₹{product.price}</h6>
                  <Badge bg="warning">{product.category}</Badge>
                  <div className="mt-3 d-flex justify-content-between">
                    <Button onClick={() => handleEdit(product.id)} variant="warning">Edit</Button>
                    <Button onClick={() => handleDelete(product.id)} variant="danger">Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination-controls">
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </Container>
    </>
  );
};

export default Home;
