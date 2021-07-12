import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import "./App.css";
import { uuid } from "uuidv4";
import api from '../api/contacts';
import Header from "./Header";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";

function App() {

  //const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setcontacts] = useState([]);

  // RetriveContacts
  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };
  
  const AddContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id:uuid(),
      ...contact
    }

    const reponse = await api.post("/contacts", request)
    setcontacts([...contacts, reponse.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const {id, name, email} = response.data;
    setcontacts(contacts.map((contact) => {
      return contact.id === id ? {...response.data} : contact;
    })
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setcontacts(newContactList);
  };

  useEffect( () => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    // if(retriveContacts) setcontacts(retriveContacts);

    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if(allContacts) setcontacts(allContacts);
    }

    getAllContacts();
  },[])

  useEffect( () => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  },[contacts])

  return (
    <div className="ui container">
      <div>
        <Router> 
          <Header />
          <Switch>
            <Route path="/" exact
            render={(props)=> (<ContactList {...props} contacts={contacts} getContactId={ removeContactHandler }/>)} 
            />
            <Route path="/add" 
            render={(props)=> (<AddContact {...props} AddContactHandler={ AddContactHandler }/>)} 
            />
            <Route path="/edit" 
            render={(props)=> (<EditContact {...props} 
              updateContactHandler={ updateContactHandler }/>)} 
            />
            <Route path="/contact/:id" 
            component={ContactDetail} 
            />
          </Switch>
        </Router>
        
      </div>
    </div>
  );
}

export default App;
