// ================== ACTION CREATORS ==================
export const clearBooking = () => ({ type: "CLEAR_BOOKING" });

// Base URL for bookings json-server
const BOOKINGS_API = "http://localhost:3000/bookings";

// ================== FETCH BOOKINGS ==================
export const fetchBookingAsync = (userId) => async (dispatch) => {
  try {
    const res = await fetch(`${BOOKINGS_API}?userId=${userId}`);
    if (!res.ok) throw new Error("Failed to fetch bookings");
    const data = await res.json();

    // Each user should have one booking object in db.json
    const booking = data[0] || { userId, items: [] };

    dispatch({ type: "SET_BOOKING_ITEMS", payload: booking.items });
  } catch (error) {
    console.error("Fetch Booking Error:", error);
  }
};

// ================== ADD OR UPDATE BOOKING ==================
export const BookingAsync = (userId, room) => async (dispatch) => {
  try {
    // Fetch current booking
    const res = await fetch(`${BOOKINGS_API}?userId=${userId}`);
    if (!res.ok) throw new Error("Failed to fetch bookings");
    const data = await res.json();
    let booking = data[0] || { userId, items: [] };

    // Add or update room
    const existingIndex = booking.items.findIndex((item) => item.id === room.id);
    if (existingIndex >= 0) {
      booking.items[existingIndex].quantity += 1;
    } else {
      booking.items.push({ ...room, quantity: 1, price: Number(room.price) });
    }

    // Save back to server
    if (booking.id) {
      // Update existing booking
      await fetch(`${BOOKINGS_API}/${booking.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });
    } else {
      // Create new booking
      await fetch(BOOKINGS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });
    }

    dispatch({ type: "SET_BOOKING_ITEMS", payload: booking.items });
  } catch (error) {
    console.error("Add Booking Error:", error);
  }
};

// ================== REMOVE BOOKING ITEM ==================
export const removeBookingAsync = (userId, roomId) => async (dispatch) => {
  try {
    const res = await fetch(`${BOOKINGS_API}?userId=${userId}`);
    if (!res.ok) throw new Error("Failed to fetch bookings");
    const data = await res.json();
    const booking = data[0];
    if (!booking) return;

    const updatedItems = booking.items.filter((item) => item.id !== roomId);

    await fetch(`${BOOKINGS_API}/${booking.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...booking, items: updatedItems }),
    });

    dispatch({ type: "SET_BOOKING_ITEMS", payload: updatedItems });
  } catch (error) {
    console.error("Remove Booking Error:", error);
  }
};

// ================== CLEAR BOOKING ==================
export const clearBookingAsync = (userId) => async (dispatch) => {
  try {
    const res = await fetch(`${BOOKINGS_API}?userId=${userId}`);
    if (!res.ok) throw new Error("Failed to fetch bookings");
    const data = await res.json();
    const booking = data[0];
    if (!booking) return;

    await fetch(`${BOOKINGS_API}/${booking.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...booking, items: [] }),
    });

    dispatch({ type: "CLEAR_BOOKING_SUCCESS" });
  } catch (error) {
    console.error("Clear Booking Error:", error);
  }
};
