import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductAsync, getAllProductAsync } from "../Services/Actions/productAction";
import { Button, Container, Row, Col, Spinner, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import { IoSearch, IoCloseCircle } from "react-icons/io5";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.productReducer);
  const { user } = useSelector((state) => state.userReducer); // 🔐 auth state
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    dispatch(getAllProductAsync());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(products);
  }, [products]);

  const handleEdit = (id) => {
    if (!user) {
      navigate("/signIn"); // 🔐 login required
      return;
    }
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    if (!user) {
      navigate("/signIn"); // 🔐 login required
      return;
    }
    dispatch(deleteProductAsync(id));
  };

  const handleView = (id) => navigate(`/product/${id}`);

  const handleSearch = () => {
    const q = search.trim().toLowerCase();
    let filtered = products.filter((prod) =>
      prod.title.toLowerCase().includes(q) ||
      prod.desc?.toLowerCase().includes(q) ||
      String(prod.price).includes(q) ||
      prod.category?.toLowerCase().includes(q)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSearch("");
    setFilteredData(products);
    setCurrentPage(1);
  };

  const handleClearSort = () => setSortOption("");

  // Sort
  let sortedProducts = [...filteredData];
  if (sortOption === "priceLowHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "nameAZ") {
    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "nameZA") {
    sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
  }

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);

  const changePage = (pageNum) => setCurrentPage(pageNum);

  return (
    <Container className="my-4 page-wrapper">
      {/* Header */}
      <div className="list-header">
        <h2 className="page-title text-center">PRODUCT LISTING</h2>

        {/* Row: Search | Sort */}
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
                <button
                  type="button"
                  className="ps-search-icon"
                  aria-label="Search"
                  onClick={handleSearch}
                >
                  <IoSearch className="fs-5" />
                </button>
                <Form.Control
                  type="text"
                  placeholder="Search by title, price or category"
                  className="ps-search-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="button"
                  className="ps-clear-icon"
                  aria-label="Clear search"
                  onClick={handleClear}
                >
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

      {/* Product Listing */}
      {isLoading ? (
        <div className="text-center"><Spinner animation="border" /></div>
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
                      <Button size="sm" className="view-btn" onClick={() => handleView(prod.id)}>View</Button>
                      <Button size="sm" className="edit-btn" onClick={() => handleEdit(prod.id)}>Edit</Button>
                      <Button size="sm" className="delete-btn" onClick={() => handleDelete(prod.id)}>Delete</Button>
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
