import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AddEmployeePage from "../pages/AddEmployeePage";
import AgeStatisticsPage from "../pages/AgeStatisticsPage";
import SalaryStatisticsPage from "../pages/SalaryStatisticsPage";
import DepartmentStatisticsPage from "../pages/DepartmentStatisticsPage";
import Layout from "../pages/Layout";
import StatisticsPage from "../pages/StatisticsPage";
import LoginPage from "../pages/LoginPage";
import LogoutPage from "../pages/LogoutPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "add", element: <AddEmployeePage /> },
      { path: "statistics", element: <StatisticsPage /> , children:[
        {path:"age", element:<AgeStatisticsPage/>},
        {path:"salary", element:<SalaryStatisticsPage/>},
        {path:"department", element:<DepartmentStatisticsPage/>}
      ]},
      { path: "login", element: <LoginPage />},
      { path: "logout", element: <LogoutPage />}
    ],
  },
]);

export default router;
