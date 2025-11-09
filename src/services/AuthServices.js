import axios from "axios";

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

export async function loginUser(formData) {
  try {
    const { data } = await axios.post(
      "https://linked-posts.routemisr.com/users/signin",
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
