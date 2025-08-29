import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Badge } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAsync } from "../../Services/Action/AuthAction"; // 🔹 Import here
import logo from "../../assets/Images/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:3000/bookings?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setBookings(data))
        .catch((err) => console.error("Error fetching bookings:", err));
    } else {
      setBookings([]);
    }
  }, [user?.id]);

  const handleLogout = () => {
    dispatch(logoutAsync());
    navigate("/sign-in");
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: "white", padding: "1rem 2rem", width: "100%" }}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" height="40" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto" style={{ gap: "1.5rem", fontWeight: "500", color: "#a58f63" }}>
            <Nav.Link href="#">DESTINATIONS</Nav.Link>
            <Nav.Link href="#">HOTELS</Nav.Link>
            <Nav.Link as={Link} to="/book" className="position-relative d-flex align-items-center gap-1">
              RESERVATION
              {bookings.length > 0 && (
                <Badge pill bg="warning" text="dark"
                  style={{ fontSize: "0.7rem", position: "absolute", top: "-6px", right: "-16px", backgroundColor: "#b0892b" }}>
                  {bookings.length}
                </Badge>
              )}
            </Nav.Link>
            <Nav.Link href="#">OFFERS</Nav.Link>
          </Nav>

          <Nav>
            {user ? (
              <NavDropdown title={<><FaUserCircle className="me-1" />{user.email}</>} id="user-dropdown" align="end">
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/sign-in" style={{ color: "#a58f63", fontWeight: "500" }}>
                Login
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/add" style={{ color: "#a58f63", fontWeight: "500" }}>
              Add Room
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
