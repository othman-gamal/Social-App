import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Mainlayout from "./Layouts/Mainlayout";
import Authlayout from "./Layouts/Authlayout";
import Newsfeed from "./pages/Newsfeed";
import Notfound from "./pages/Notfound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedPath from "./ProtectedRoutes/ProtectedPath";
import ProtectedAuth from "./ProtectedRoutes/ProtectedAuth";
import PostDetails from "./pages/PostDetails";
import CreatePostModal from "./pages/CreatePostModal";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <ProtectedPath>
          <Mainlayout />
        </ProtectedPath>
      ),
      children: [
        {
          index: true,
          element: (
            <ProtectedPath>
              {" "}
              <Newsfeed />{" "}
            </ProtectedPath>
          ),
        },
        {
          path: "/post-details/:id",
          element: (
            <ProtectedPath>
              {" "}
              <PostDetails />
            </ProtectedPath>
          ),
        },

        {
          path: "*",
          element: (
            <ProtectedPath>
              {" "}
              <Notfound />
            </ProtectedPath>
          ),
        },
      ],
    },
    {
      path: "",
      element: (
        <ProtectedAuth>
          <Authlayout />
        </ProtectedAuth>
      ),
      children: [
        {
          path: "register",
          element: (
            <>
              {" "}
              <Register />
            </>
          ),
        },
        {
          path: "login",
          element: (
            <ProtectedAuth>
              {" "}
              <Login />
            </ProtectedAuth>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
