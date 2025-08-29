// src/Services/AuthService.js
const API_URL = "http://localhost:3000/users";

// Get currently "logged-in" user from localStorage
export const getCurrentUser = async () => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    const user = JSON.parse(savedUser);
    console.log("Current user:", user);
    return user;
  } else {
    console.log("No user is currently signed in.");
    return null;
  }
};

// Simulate auth listener
export const setupAuthListener = (callback) => {
  // Poll localStorage every second to simulate auth changes
  let lastUser = localStorage.getItem("user");
  setInterval(() => {
    const currentUser = localStorage.getItem("user");
    if (currentUser !== lastUser) {
      lastUser = currentUser;
      if (currentUser) {
        console.log("User signed in:", JSON.parse(currentUser));
        callback(JSON.parse(currentUser));
      } else {
        console.log("No user is currently signed in.");
        callback(null);
      }
    }
  }, 1000);
};

// Optional helper to log in a user (store in db.json via json-server)
export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${API_URL}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    if (!res.ok) throw new Error("Failed to fetch user");
    const users = await res.json();
    if (users.length === 0) throw new Error("Invalid email or password");
    const user = users[0];
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Optional logout helper
export const logoutUser = () => {
  localStorage.removeItem("user");
};
