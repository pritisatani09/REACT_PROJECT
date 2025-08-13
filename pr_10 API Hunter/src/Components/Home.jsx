import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductAsync, getAllProductAsync } from "../Services/Actions/productAction";
import { Button, Container, Row, Col, Spinner, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.productReducer);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("");
  const productsPerPage = 8;

  useEffect(() => {
    dispatch(getAllProductAsync());
  }, [dispatch]);

  const handleEdit = (id) => navigate(`/edit-product/${id}`);
  const handleDelete = (id) => dispatch(deleteProductAsync(id));
  const handleView = (id) => navigate(`/product/${id}`);
  const handleClearSort = () => setSortOption("");

  // Filter
  let filteredProducts = products.filter(
    (prod) =>
      prod.title.toLowerCase().includes(searchQuery) ||
      prod.desc.toLowerCase().includes(searchQuery) ||
      prod.price.toString().includes(searchQuery)
  );

  // Sort
  if (sortOption === "priceLowHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "nameAZ") {
    filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "nameZA") {
    filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
  }

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const changePage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <Container className="my-4 page-wrapper">
      {/* Title + Sorting */}
      <div className="list-header">
        <h2 className="page-title">PRODUCT LISTING</h2>
        <div className="sort-controls">
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
          <Button className="clear-btn" onClick={handleClearSort}>
            Clear
          </Button>
        </div>
      </div>

      {/* Product Listing */}
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Row className="g-4">
            {currentProducts.length > 0 ? (
              currentProducts.map((prod) => (
                <Col md={3} sm={6} xs={12} key={prod.id}>
                  <div className="product-card">
                    <img src={prod.image} alt={prod.title} className="product-img" />
                    <h5 className="product-title">{prod.title}</h5>
                    <div className="product-desc">{prod.desc}</div>
                    <div className="product-meta">{prod.category}</div>
                    <div className="product-price">₹{prod.price}</div>
                    <div className="edit-delete-btns">
                      <Button size="sm" className="view-btn" onClick={() => handleView(prod.id)}>
                        View
                      </Button>
                      <Button size="sm" className="edit-btn" onClick={() => handleEdit(prod.id)}>
                        Edit
                      </Button>
                      <Button size="sm" className="delete-btn" onClick={() => handleDelete(prod.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <p className="text-center text-muted">No products found.</p>
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
