import React from "react";
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";


function App() {

  const contacts = [
    {
      id: "1",
      "name":"Aryan",
      "email":"aryanbindal2015@gmail.com",
    },
    {
      id: "2",
      "name":"Aakash",
      "email":"aakashbindal@gmail.com",
    }
  ];
  return (
    <div className="ui container">
      <div>
        <Header />
        <AddContact />
        <ContactList contacts={contacts} />
      </div>
    </div>
  );
}

export default App;
