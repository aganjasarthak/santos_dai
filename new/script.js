// Use your Cloudflare Worker URL here:
const API_URL = "https://flat-voice-c146.sarthak-aganja12345.workers.dev";

// Login function: sends credentials to the worker.
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    if (result.success) {
      localStorage.setItem("authToken", result.token);
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("message").textContent = result.message || "Login failed.";
    }
  } catch (error) {
    document.getElementById("message").textContent = "Error connecting to server.";
  }
}

// Check authentication: verifies the token before allowing access to the dashboard.
async function checkAuth() {
  const token = localStorage.getItem("authToken");
  if (!token) {
    window.location.href = "login.html";
    return;
  }
  try {
    const response = await fetch(`${API_URL}/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });
    const result = await response.json();
    if (!result.success) {
      localStorage.removeItem("authToken");
      window.location.href = "index.html";
    }
  } catch (error) {
    localStorage.removeItem("authToken");
    window.location.href = "index.html";
  }
}

// Logout function: clears the token and returns to the login page.
function logout() {
  localStorage.removeItem("authToken");
  window.location.href = "login.html";
}

