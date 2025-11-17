import axios from "axios";
//1 get all
export async function getAllPosts() {
  const data = await axios.get(`https://linked-posts.routemisr.com/posts`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
    params: {
      limit: 50,
      sort: "-createdAt",
    },
  });
  return data;
}

// get single
export async function getSinglePost(id) {
  const data = await axios.get(
    `https://linked-posts.routemisr.com/posts/${id}`,
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
  return data;
}

//3 get user post

export async function getUserPost({ id }) {
  const data = await axios.get(
    `https://linked-posts.routemisr.com/users/profile-data`,
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
  return data;
}

//4 create post

export async function createPost(formData) {
  try {
    const data = await axios.post(
      "https://linked-posts.routemisr.com/posts",
      formData,
      {
        headers: {
          token: localStorage.getItem("userToken"),
          // Do NOT set Content-Type, browser will set it automatically for FormData
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

//edit post
export async function updatePost(postId, formData) {
  try {
    const data = await axios.put(
      `https://linked-posts.routemisr.com/posts/${postId}`,
      formData,
      {
        headers: {
          token: localStorage.getItem("userToken"),
          // Do NOT set Content-Type, browser will set it automatically for FormData
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

//delete
export async function DeletePost(id) {
  const data = await axios.delete(
    `https://linked-posts.routemisr.com/posts/${id}`,
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
  return data;
}
