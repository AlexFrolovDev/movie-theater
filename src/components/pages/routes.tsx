import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "./Home";
import Admin from "./Admin";
import Order from "./Order";
import MoviesList from "./Admin/MoviesList";
/* 
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/admin",
        element: <div>Movies list</div>,
        children: [
          {
            path: '/movies-list',
            element: <div>Movies List</div>
          },
          {
            path: '/add-movie',
            element: <div>Add movie</div>
          },
          {
            path: '/edit-movie/:movieId',
            element: <div>Edit movie</div>
          }
        ]
      },
      {
        path: "/schedule",
        element: <Order />,
      },
    ],
    errorElement: <div><b>404 - no such page</b></div>
  },
]); */

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="admin">
        <Route path="" element={<MoviesList />} />
        <Route path="add-movie" element={<div>New Movie</div>} />
        <Route path="edit-movie/:movieId" element={<div>Edit movie</div>} />
      </Route>
      <Route path="order" element={<Order />} />
    </Route>
  )
);

export default routes;
