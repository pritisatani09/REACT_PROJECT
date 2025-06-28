import { useState } from "react";
import "./Feedback.css";

const Feedback = () => {
  const initialForm = {
    username: "",
    email: "",
    password: "",
    message: "",
    rating: 0,
  };

  const [inputForm, setInputForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [feedbackList, setFeedbackList] = useState([]);

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  const handleRatingChange = (rating) => {
    setInputForm({ ...inputForm, rating });
  };

  const validate = () => {
    const errorList = {};

    if (inputForm.username.trim() === "") {
      errorList.username = "Please enter your name.";
    }

    if (inputForm.email.trim() === "") {
      errorList.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(inputForm.email)) {
      errorList.email = "Enter a valid email address.";
    }

    if (inputForm.message.trim() === "") {
      errorList.message = "Please enter a review message.";
    }

    if (inputForm.rating === 0) {
      errorList.rating = "Please select a rating.";
    }

    return errorList;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      setFeedbackList([...feedbackList, inputForm]);
      setInputForm(initialForm);
      setErrors({});
    } else {
      setErrors(validationErrors);
      alert("Please fill all fields.");
    }
  };

  return (
    <div className="page-container">
      <div className="feedback-form-container">
        <h1 className="main-title">Express Your Opinion</h1>
        <form onSubmit={handleSubmit} className="feedback-form">
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={inputForm.username}
              onChange={handleChanged}
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </label>

          <label>
            Email:
            <input
              type="text"
              name="email"
              value={inputForm.email}
              onChange={handleChanged}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </label>

          <label>
            Review:
            <textarea
              name="message"
              rows="4"
              value={inputForm.message}
              onChange={handleChanged}
            />
            {errors.message && <div className="error">{errors.message}</div>}
          </label>

          <label>
            Rating:
            <div className="stars">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  onClick={() => handleRatingChange(num)}
                  className={inputForm.rating >= num ? "star selected" : "star"}
                >
                  ★
                </span>
              ))}
            </div>
            {errors.rating && <div className="error">{errors.rating}</div>}
          </label>

          <div className="button-container">
            <button type="submit">Submit</button>
          </div>

        </form>
      </div>

      <div className="feedback-list-container">
        <h2 className="submitted-title">Submitted Reviews</h2>
        <div className="feedback-list">
          {feedbackList.map((review, index) => (
            <div className="feedback-card" key={index}>
              <h3>{review.username}</h3>
              <p><strong>Email:</strong> {review.email}</p>
              <p><strong>Review:</strong> {review.message}</p>
              <p>
                <strong>Rating:</strong>{" "}
                <span className="gold-stars">{"★".repeat(review.rating)}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
