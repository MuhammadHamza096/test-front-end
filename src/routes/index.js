import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Games from "../pages/Games";
import Layout from "../pages/Layout";
import Users from "../pages/Customers";
import NotFound from "../pages/NotFound";
const publicRouting = [
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/users",
    Component: Users,
  },
  {
    path: "/games",
    Component: Games,
  },
];
const Routing = () => {
  return (
    <Router>
      <Routes>
        {publicRouting.map(({ path, Component }, index) => {
          return (
            <Route
              path={path}
              key={index}
              element={<Layout Component={Component} />}
            ></Route>
          );
        })}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
};
export default Routing;
