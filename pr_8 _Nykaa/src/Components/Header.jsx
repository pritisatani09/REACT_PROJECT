import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/nykaa.png"; 

const Header = () => {
  return (
    <Navbar className="navbar">
      <Container>
        {/* Logo on the left */}
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="Logo"
            height="100"
            style={{ borderRadius: "8px" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Link to="/add-product">Add Product</Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
