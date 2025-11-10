import axios from "axios";

export async function getAllPosts() {
  const data = axios.get(`https://linked-posts.routemisr.com/posts`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
  return data;
}
