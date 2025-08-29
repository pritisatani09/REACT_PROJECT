// ================== ACTION CREATORS ==================
const signUpSuc = () => ({ type: "SIGN_UP_SUC" });
export const signINSuc = (user) => ({ type: "SIGN_IN_SUC", payload: user });
const signOUTSUC = () => ({ type: "SIGN_OUT_SUC" });
const errorMsg = (err) => ({ type: "ERROR", payload: err });

export const authCheckDone = () => ({ type: "AUTH_CHECK_DONE" });

// ✅ Base URL for json-server (make sure your server runs on correct port)
const API_URL = "http://localhost:3000/users";

// ================== SIGN UP ==================
export const signUpAsync = (data) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${API_URL}?email=${encodeURIComponent(data.email)}`);
      if (!res.ok) throw new Error("Failed to connect server");

      const existingUser = await res.json();
      if (existingUser.length > 0) {
        throw new Error("User already exists");
      }

      const newUser = { ...data, role: data.role || "customer" };

      const createRes = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!createRes.ok) throw new Error("Failed to create account");

      dispatch(signUpSuc());
    } catch (error) {
      console.error("SignUp Error:", error);
      dispatch(errorMsg(error.message || "Something went wrong"));
    }
  };
};

// ================== SIGN IN ==================
export const signINAsync = (data) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `${API_URL}?email=${encodeURIComponent(data.email)}&password=${encodeURIComponent(data.password)}`
      );
      if (!res.ok) throw new Error("Failed to connect server");

      const users = await res.json();
      if (users.length === 0) throw new Error("Invalid email or password");

      const user = users[0];

      // save in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      dispatch(signINSuc(user));
    } catch (error) {
      console.error("SignIn Error:", error);
      dispatch(errorMsg(error.message || "Something went wrong"));
    }
  };
};

// ================== GOOGLE SIGN IN (SIMULATED) ==================
export const googleSignInAsync = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to connect server");

      const users = await res.json();
      let user;

      if (users.length > 0) {
        user = users[0];
      } else {
        user = {
          id: Date.now(),
          email: "googleuser@example.com",
          displayName: "Google User",
          role: "customer",
        };

        const createRes = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        if (!createRes.ok) throw new Error("Failed to create Google user");
      }

      localStorage.setItem("user", JSON.stringify(user));
      dispatch(signINSuc(user));
    } catch (error) {
      console.error("Google SignIn Error:", error);
      dispatch(errorMsg(error.message || "Something went wrong"));
    }
  };
};

// ================== LOGOUT ==================
export const logoutAsync = () => (dispatch) => {
  localStorage.removeItem("user");   // 🔹 remove user
  dispatch({ type: "SIGN_OUT_SUC" }); // 🔹 Redux state update
};


// ================== AUTH CHECK ==================
export const authCheck = () => {
  return (dispatch) => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      dispatch(signINSuc(JSON.parse(savedUser)));
    }
    dispatch(authCheckDone());
  };
};

// ================== SET USER (Manual) ==================
export const setUserFromFirebase = (user) => (dispatch) => {
  localStorage.setItem("user", JSON.stringify(user));
  dispatch(signINSuc(user));
};
