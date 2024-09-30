import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import SearchBox from "./SearchBox/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from "../redux/contacts/selectors";
import { lazy, useEffect } from "react";
import { fetchContacts } from "../redux/contacts/operations";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import { Route, Routes } from "react-router-dom";
import Layot from "./Layot";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("../pages/ContactsPage/ContactsPage"));
const RegistrationPage = lazy(() =>
  import("../pages/RegistrationPage/RegistrationPage")
);
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

function App() {
  // useEffect(() => {
  //   dispatch(fetchContacts());
  // }, [dispatch]);

  return (
    <div>
      <Layot>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/register" element={<RegistrationPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/contacts" element={<ContactsPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Layot>
    </div>
  );
}

export default App;
