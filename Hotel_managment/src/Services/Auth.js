import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserFromFirebase, authCheckDone } from "./Action/AuthAction";
import { fetchBookingAsync, clearBookingAsync } from "./Action/BookAction";

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fake auth via localStorage (db.json-based apps mā Firebase nathi)
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      dispatch(setUserFromFirebase(savedUser));
      dispatch(fetchBookingAsync());
    } else {
      dispatch(setUserFromFirebase(null));
      dispatch(clearBookingAsync());
    }
    dispatch(authCheckDone());
  }, [dispatch]);

  return null;
};

export default AuthListener;
