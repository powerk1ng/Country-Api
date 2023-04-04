import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import SingleCountryInfo from "../components/SingleCountryInfo";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../components/ErrorPage";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />} errorElement={<ErrorPage/>}>
        <Route index element={<Home />} />
        <Route path="/country/:name" element={<SingleCountryInfo />} />
      </Route>
    </>
  )
);

export default router;
