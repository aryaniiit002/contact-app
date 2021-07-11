import React, { useState } from "react";
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";


function App() {

  const [contacts, setcontacts] = useState([]);

  const AddContactHandler = (contact) => {
    console.log(contact);
    setcontacts([...contacts, contact]);
  };
  return (
    <div className="ui container">
      <div>
        <Header />
        <AddContact AddContactHandler={ AddContactHandler }/>
        <ContactList contacts={contacts} />
      </div>
    </div>
  );
}

export default App;
