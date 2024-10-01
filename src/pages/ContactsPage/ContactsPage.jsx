import { useEffect } from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import { fetchContacts } from "../../redux/contacts/operations";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../../components/SearchBox/SearchBox";
import {
  selectContacts,
  selectModalIsOpen,
} from "../../redux/contacts/selectors";
import ModalForm from "../../components/ModalForm/ModalForm";

export default function ContactsPage() {
  const contactlist = useSelector(selectContacts);
  const modalIsOpen = useSelector(selectModalIsOpen);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <ContactForm />
      {contactlist.length > 2 && <SearchBox />}
      <ContactList />
      {modalIsOpen && <ModalForm />}
    </div>
  );
}
