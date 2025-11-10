import axios from "axios";
const API_URL = import.meta.env.VITE_BASE_URL;

export async function registerUser(formData) {
  try {
    const { data } = await axios.post(
      "https://linked-posts.routemisr.com/users/signup",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Full axios error:", error);
    throw error;
  }
}

export async function loginUser(FormData) {
  try {
    const response = await axios.post(
      "https://linked-posts.routemisr.com/users/signin",
      FormData,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data; // ✅ return data directly
  } catch (error) {
    console.error("Full axios error: ", error);
    throw error; // keep throwing so Login.jsx can handle it
  }
}
