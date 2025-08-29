const initialState = {
  loading: false,
  bookings: [],
  error: null,
};

const BookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BOOKING_LOADING":
      return { ...state, loading: true };
    case "FETCH_BOOKINGS_SUCCESS":
      return { ...state, loading: false, bookings: action.payload };
    case "BOOKING_CREATED_SUCCESS":
      return { ...state, bookings: [...state.bookings, action.payload], loading: false };
    case "BOOKING_ERROR":
    case "BOOKING_CREATED_FAILED":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default BookingReducer;
