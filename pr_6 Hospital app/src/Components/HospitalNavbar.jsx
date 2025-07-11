import { Container, Navbar } from 'react-bootstrap';
import hospitallogo from '../assets/hospital.jpg';
import './HospitalNavbar.css';

function HospitalNavbar() {
  return (
    <Navbar expand="lg" className="hospital-navbar sticky-top">
      <Container>
        <Navbar.Brand className="d-flex align-items-center">
          <img
            src={hospitallogo}
            alt="Hospital Logo"
            width="60"
            height="60"
            className="me-3 rounded"
          />
          <span className="fw-bold fs-4 text-white">Medicare System</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default HospitalNavbar;
