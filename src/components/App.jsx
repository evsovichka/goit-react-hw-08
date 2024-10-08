import { useDispatch, useSelector } from "react-redux";
import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layot from "./Layout";
import { refreshUser } from "../redux/auth/operations";
import { selectIsRefreshing } from "../redux/auth/selectors";
import RestrictedRoute from "./RestrictedRoute";
import PrivateRoute from "./PrivateRoute";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("../pages/ContactsPage/ContactsPage"));
const RegistrationPage = lazy(() =>
  import("../pages/RegistrationPage/RegistrationPage")
);
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <div>
      {isRefreshing ? (
        <b style={{ fontSize: "20px", color: "#c67c4e" }}>Please wait... </b>
      ) : (
        <Layot>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  component={<RegistrationPage />}
                  redirectTo={"/"}
                />
              }
            />

            <Route
              path="/login"
              element={
                <RestrictedRoute
                  component={<LoginPage />}
                  redirectTo={"/contacts"}
                />
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute
                  component={<ContactsPage />}
                  redirectTo={"/login"}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layot>
      )}
      <div>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
