import axios from "axios";

// Base URL for JSON-server
const API_URL = "http://localhost:3000/carts";

// ================== ACTION CREATORS ==================
export const clearCart = () => ({
  type: "CLEAR_CART",
});

export const setCartItems = (items) => ({
  type: "SET_CART_ITEMS",
  payload: items,
});

// ================== FETCH CART ==================
export const fetchCartAsync = () => async (dispatch, getState) => {
  const { user } = getState().authReducer;
  if (!user) return;

  try {
    const res = await axios.get(`${API_URL}?userId=${user.uid}`);
    let cartItems = [];
    if (res.data.length > 0) {
      cartItems = res.data[0].items || [];
    } else {
      // Create cart entry if not exists
      await axios.post(API_URL, { userId: user.uid, items: [] });
    }
    dispatch(setCartItems(cartItems));
  } catch (error) {
    console.error("Fetch Cart Error:", error);
  }
};

// ================== ADD TO CART ==================
export const addToCartAsync = (room) => async (dispatch, getState) => {
  const { user } = getState().authReducer;
  if (!user) return;

  try {
    const res = await axios.get(`${API_URL}?userId=${user.uid}`);
    let cart = res.data[0];

    if (!cart) {
      // Cart doesn't exist, create new
      const newCart = { userId: user.uid, items: [{ ...room, quantity: 1, price: Number(room.price) }] };
      await axios.post(API_URL, newCart);
      dispatch(setCartItems(newCart.items));
      return;
    }

    let cartItems = cart.items || [];
    const existingIndex = cartItems.findIndex((item) => item.id === room.id);
    if (existingIndex >= 0) {
      cartItems[existingIndex].quantity += 1;
    } else {
      cartItems.push({ ...room, quantity: 1, price: Number(room.price) });
    }

    await axios.put(`${API_URL}/${cart.id}`, { ...cart, items: cartItems });
    dispatch(setCartItems(cartItems));
  } catch (error) {
    console.error("Add to Cart Error:", error);
  }
};

// ================== REMOVE FROM CART ==================
export const removeFromCartAsync = (roomId) => async (dispatch, getState) => {
  const { user } = getState().authReducer;
  if (!user) return;

  try {
    const res = await axios.get(`${API_URL}?userId=${user.uid}`);
    const cart = res.data[0];
    if (!cart) return;

    const updatedItems = (cart.items || []).filter((item) => item.id !== roomId);
    await axios.put(`${API_URL}/${cart.id}`, { ...cart, items: updatedItems });
    dispatch(setCartItems(updatedItems));
  } catch (error) {
    console.error("Remove from Cart Error:", error);
  }
};

// ================== CLEAR CART ==================
export const clearCartAsync = () => async (dispatch, getState) => {
  const { user } = getState().authReducer;
  if (!user) return;

  try {
    const res = await axios.get(`${API_URL}?userId=${user.uid}`);
    const cart = res.data[0];
    if (!cart) return;

    await axios.put(`${API_URL}/${cart.id}`, { ...cart, items: [] });
    dispatch({ type: "CLEAR_CART_SUCCESS" });
  } catch (error) {
    console.error("Clear Cart Error:", error);
  }
};
