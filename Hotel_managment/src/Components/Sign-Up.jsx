import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUpAsync } from "../Services/Action/AuthAction";
import { ToastContainer, toast } from "react-toastify";
import "./Sign-in.css";


const SignUP = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isCreated, errorMSG } = useSelector((state) => state.authReducer || {});

  const [inputForm, setInputForm] = useState({ email: "", password: "", cpassword: "" });
  const [errors, setErrors] = useState({});

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!inputForm.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputForm.email)) newErrors.email = "Enter a valid email";
    if (!inputForm.password.trim()) newErrors.password = "Password is required";
    else if (inputForm.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!inputForm.cpassword.trim()) newErrors.cpassword = "Confirm Password is required";
    else if (inputForm.password !== inputForm.cpassword) newErrors.cpassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) dispatch(signUpAsync(inputForm));
  };

  useEffect(() => {
    if (isCreated) {
      toast.success("Account created successfully");
      navigate("/sign-in");
    }
  }, [isCreated, navigate]);

  return (
    <div className="sign-container">
      <ToastContainer position="top-center" autoClose={2500} theme="colored" />
      <h1 className="sign-title">Sign Up</h1>
      {errorMSG && <p className="error-msg">{errorMSG}</p>}
      <Form onSubmit={handleSubmit} className="sign-form">
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">Email</Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              name="email"
              value={inputForm.email}
              onChange={handleChanged}
              isInvalid={!!errors.email}
              placeholder="Enter your email" // 🔹 placeholder
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">Password</Form.Label>
          <Col sm="9">
            <Form.Control
              type="password"
              name="password"
              value={inputForm.password}
              onChange={handleChanged}
              isInvalid={!!errors.password}
              placeholder="Enter your password" // 🔹 placeholder
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">Confirm Password</Form.Label>
          <Col sm="9">
            <Form.Control
              type="password"
              name="cpassword"
              value={inputForm.cpassword}
              onChange={handleChanged}
              isInvalid={!!errors.cpassword}
              placeholder="Confirm your password" // 🔹 placeholder
            />
            <Form.Control.Feedback type="invalid">{errors.cpassword}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Button type="submit" className="w-100 btn-primary">Sign Up</Button>
      </Form>
      <p className="signup-link mt-3">Already have an account? <Link to="/sign-in">Sign In</Link></p>
    </div>
  );
};

export default SignUP;
