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
import EditMovie from "./Admin/EditMovie";
import ScheduleMovie from "./Admin/ScheduleMovie";
import AddMovie from "./Admin/AddMovie";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="admin">
        <Route path="" element={<MoviesList />} />
        <Route path="add-movie" element={<AddMovie />} />
        <Route path="edit-movie/:movieId" element={<EditMovie />} />
        <Route path="schedule-movie" element={<ScheduleMovie />} />
      </Route>
      <Route path="order-movie/:scheduleId" element={<Order />} />
    </Route>
  )
);

export default routes;
