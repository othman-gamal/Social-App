import axios from "axios";

export async function GetPostComments(id) {
  const data = await axios.get(
    `https://linked-posts.routemisr.com/posts/${id}/comments`,
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
  return data;
}

export async function CreateComment(comment) {
  const data = await axios.post(
    `https://linked-posts.routemisr.com/comments`,
    comment,
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
  return data;
}

export async function DeleteComment(id) {
  const data = await axios.delete(
    `https://linked-posts.routemisr.com/comments/${id}`,
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
  return data;
}

export async function editComment(id, content) {
  const data = await axios.put(
    `https://linked-posts.routemisr.com/comments/${id}`,
    { content },
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
  return data;
}
