import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filters/selectors";

export const selectContacts = (state) => state.contacts.items;
export const selectIsLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) => {
    return contacts.filter((contact) => {
      const nameMatches = contact.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
      const numberMatches = typeof (nameFilter === "number")
        ? contact.number.includes(nameFilter)
        : false;
      return nameMatches || numberMatches;
    });
  }
);
// if (typeof nameFilter === "number") {
//   return contacts.filter((contact) => contact.number.includes(nameFilter));
// }
// return contacts.filter((contact) =>
//   contact.name.toLowerCase().includes(nameFilter.toLowerCase())
// );
