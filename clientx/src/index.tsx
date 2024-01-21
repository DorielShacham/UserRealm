import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import { ErrorPage } from "./pages/errorpage/ErrorPage";
import { Home } from "./pages/home/Home";
import { Postdetail } from "./pages/postdetail/Postdetail";
import { Register } from "./pages/register/Register";
import { Login } from "./pages/login/Login";
import { Userprofile } from "./pages/userprofile/Userprofile";
import { Developers } from "./pages/developers/Developers";
import { Createpost } from "./pages/createpost/Createpost";
import { Editpost } from "./pages/editpost/Editpost";
import { Deletepost } from "./pages/deletepost/Deletepost";
import { Categoryposts } from "./pages/categoryposts/Categoryposts";
import { Developerposts } from "./pages/developerposts/Developerposts";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Logout } from "./pages/logout/Logout";
import UserProvider from "./contex/userContext";
import About from "./pages/about/About";

// function disableDevtools() {
//   document.addEventListener("contextmenu", (e) => e.preventDefault());

//   function ctrlShiftKey(e: KeyboardEvent, keyCode: string) {
//     return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
//   }

//   document.onkeydown = (e) => {
//     if (
//       e.keyCode === 123 ||
//       ctrlShiftKey(e, "I") ||
//       ctrlShiftKey(e, "J") ||
//       ctrlShiftKey(e, "C") ||
//       (e.ctrlKey && e.keyCode === "U".charCodeAt(0))
//     )
//       return false;
//   };
// }
// disableDevtools();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <Layout />
      </UserProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "posts/:id",
        element: <Postdetail />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile/:id",
        element: <Userprofile />,
      },
      {
        path: "developers",
        element: <Developers />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "create",
        element: <Createpost />,
      },
      {
        path: "posts/categories/:category",
        element: <Categoryposts />,
      },
      {
        path: "posts/users/:id",
        element: <Developerposts />,
      },
      {
        path: "myposts/:id",
        element: <Dashboard />,
      },
      {
        path: "posts/:id/edit",
        element: <Editpost />,
      },
      {
        path: "posts/:id/delete",
        element: <Deletepost postId={undefined} />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
