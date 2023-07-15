import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootPage from "./pages/Root";
import HomePage from "./components/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ErrorPage from "./pages/Error";

import { action as registerAction } from "./pages/RegisterPage";
import { action as loginAction } from "./pages/LoginPage";
import PostsRootLayout from "./pages/PostsRoot";
import PostsPage, { loader as postsLoader } from "./pages/Posts";
import NewPostPage from "./pages/NewPost";
import { action as logoutAction } from "./pages/LogOut";
import { tokenLoader } from "./pages/util/auth";
import PostDetailPage, {
  loader as postDetailLoader,
  action as postDeleteAction,
} from "./pages/PostDetail";
import EditPostPage from "./pages/EditPost";
import { action as manipulatePostAction } from "./components/NewPostForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/posts",
        element: <PostsRootLayout />,
        children: [
          { index: true, element: <PostsPage />, loader: postsLoader },
          {
            path: "new",
            element: <NewPostPage />,
            action: manipulatePostAction,
          },
          {
            path: ":postId",
            id: "post-detail",
            loader: postDetailLoader,
            children: [
              {
                index: true,
                element: <PostDetailPage />,
                action: postDeleteAction,
              },
              {
                path: "edit",
                element: <EditPostPage />,
                action: manipulatePostAction,
              },
            ],
          },
        ],
      },
      {
        path: "/register",
        element: <RegisterPage />,
        action: registerAction,
      },
      {
        path: "/login",
        element: <LoginPage />,
        action: loginAction,
      },
      {
        path: "/logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
