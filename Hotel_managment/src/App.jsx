import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";

// Components
import Header from "./Components/Header/Header";
import Home from "./Components/Home";
import AddRoom from "./Components/AddRoom";
import EditRoom from "./Components/EditRoom";
import ViewRoom from "./Components/ViewRoom";
import Payment from "./Components/Payment";
import BookRoom from "./Components/Book";
import SignUp from "./Components/Sign-Up"; 
import SignIn from "./Components/Sign-In";
import BookingSuccess from './Components/BookingSuccess'
import MyBookings from "./Components/MyBookings";

// Actions
import { authCheck } from "./Services/Action/AuthAction";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddRoom />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/edit/:id" element={<EditRoom />} />
        <Route path="/view/:id" element={<ViewRoom />} />
        <Route path="/book" element={<BookRoom />} />
        <Route path="/book" element={<MyBookings />}/>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
