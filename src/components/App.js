import React, { useState, useEffect } from "react";
import './App.css';
import { uuid } from 'uuidv4'
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";

function App() {

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setcontacts] = useState([]);

  const AddContactHandler = (contact) => {
    console.log(contact);
    setcontacts([...contacts, {id: uuid(), ...contact}]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id != id;
    });

    setcontacts(newContactList);
  };

  useEffect( () => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(retriveContacts) setcontacts(retriveContacts);
  },[])

  useEffect( () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  },[contacts])

  return (
    <div className="ui container">
      <div>
        <Header />
        <AddContact AddContactHandler={ AddContactHandler }/>
        <ContactList contacts={contacts} getContactId={ removeContactHandler }/>
      </div>
    </div>
  );
}

export default App;
