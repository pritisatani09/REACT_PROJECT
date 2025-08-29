import axios from "axios";
import { toast } from "react-toastify";

// Action types
export const FETCH_BOOKINGS_REQUEST = "FETCH_BOOKINGS_REQUEST";
export const FETCH_BOOKINGS_SUCCESS = "FETCH_BOOKINGS_SUCCESS";
export const FETCH_BOOKINGS_FAILURE = "FETCH_BOOKINGS_FAILURE";
export const BOOKING_CREATED_SUCCESS = "BOOKING_CREATED_SUCCESS";
export const BOOKING_CREATED_FAILED = "BOOKING_CREATED_FAILED";

// Base URL for JSON-server
const API_URL = "http://localhost:3000/bookings";

// ================== FETCH BOOKINGS ==================
export const fetchBookingsAsync = (userId, isAdmin) => async (dispatch) => {
  dispatch({ type: FETCH_BOOKINGS_REQUEST });

  try {
    let bookings = [];

    if (isAdmin) {
      // Fetch all bookings
      const res = await axios.get(API_URL);
      bookings = res.data || [];
    } else {
      // Fetch bookings for specific user
      const res = await axios.get(`${API_URL}?userId=${userId}`);
      bookings = res.data || [];
    }

    dispatch({ type: FETCH_BOOKINGS_SUCCESS, payload: bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    dispatch({ type: FETCH_BOOKINGS_FAILURE, payload: error.message });
  }
};

// ================== CREATE BOOKING ==================
export const createBookingAsync = (formData, cartItems, finalAmount) => {
  return async (dispatch, getState) => {
    const { user } = getState().authReducer;

    if (!user || !user.id) {
      toast.error("User not logged in.");
      return;
    }

    try {
      // Create new booking object
      const newBooking = {
        userId: user.id,
        guestInfo: formData,
        rooms: cartItems,
        totalPayable: finalAmount,
        createdAt: new Date().toISOString(),
        bookingId: Date.now().toString(),
      };

      await axios.post(API_URL, newBooking);

      toast.success("Booking successful!");
      dispatch({ type: BOOKING_CREATED_SUCCESS });
    } catch (error) {
      console.error("Booking save error:", error);
      toast.error("Failed to save booking.");
      dispatch({ type: BOOKING_CREATED_FAILED, payload: error.message });
    }
  };
};
