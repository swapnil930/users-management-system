import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../NavBar/Spinner';
import { ContactServices } from '../../../Services/Services';


const ContactList = () => {
  const[query,setQuery]=useState({
    text:""
  })
  
  const [state, setState] = useState({
    loading: true,
    contacts: [],
    filteredContacts:[],
    errorMessage: ""
  });


  //fetching all contacts
  useEffect(() => {
    let promise = new Promise((res, rej) => {    
      setState((prevState) => ({
        ...prevState,
        loading: true,
        contacts: [],
  
      }));
      let response = ContactServices.getAllContacts();
      res(response);
    });

    promise.then((res1) => {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          contacts: res1.data,filteredContacts:res1.data
        }));
      })
      .catch(() => {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          errorMessage: "Empty Contact List...!!"
        }));
      });
  }, []);


  //delete contacts
let clickDelete=(contactId)=>{
 let promise=new Promise((res, rej)=>{
   let deleteContact=ContactServices.deleteContact(contactId)
   res(deleteContact)
 })
 promise.then((res1)=>{
 if(res1){
  let promise = new Promise((res, rej) => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
      contacts: []
    }));

    let response = ContactServices.getAllContacts();
    res(response);
  });
  promise.then((res1) => {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        contacts: res1.data,filteredContacts:res1.data
      }));
    })
    .catch(() => {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        errorMessage: "Something went wrong, can't fetch the data...!!"
      }));
    });
 }
 })
}

//search contacts
let searchContact=(event)=>{
  setQuery({...query,text:event.target.value})

  let theContacts=state.contacts.filter((contact)=>{
    return contact.name.toLowerCase().includes(event.target.value.toLowerCase());
  })
  console.log(theContacts);
  setState({...state,filteredContacts:theContacts})
  
}

  const { loading, contacts, filteredContacts,errorMessage } = state;

  return (
    <>
    <div className="container text text-center">{errorMessage}</div>
      <section className="contact-search">
        <div className="container p-3">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3" style={{ fontFamily: "sans-serif" }}>
                   Contact Manager
                  <Link to={'/contacts/add'} className="btn btn-primary mx-3">
                    <i className="fa fa-plus-circle me-1"></i>New
                  </Link>
                </p>
                <p className=""style={{fontFamily:'serif'}}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis, excepturi Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis, excepturi excepturi Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <form className="row">
                  <div className="col">
                    <div className="mb-2">
                      <input
                        type="text" placeholder="Search Contacts" name="text" value={query.text} className="form-control" onChange={searchContact} />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading?(<Spinner/>):(
        <section className="contact-list">
        <div className="container">
          <div className="row">
            {contacts && filteredContacts.length > 0 &&
              filteredContacts.map((contact) => {
                return (
                  <div key={contact.id} className="col-md-6 mb-4">
                    <div className="card d-flex justify-content-around p-1">
                      <div className="card-body">
                        <div className="row d-flex align-items-md-center">
                          <div className="col-md-3 d-flex col-sm-3 justify-content-center">
                            <img className="profile-img" src={contact.photo} alt=""
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="list-group">
                              <div className="list-group-item list-group-item-action">
                                NAME:{' '}
                                <span className="fw-bold">
                                  {contact.name}
                                </span>
                              </div>
                              <div className="list-group-item list-group-item-action">
                                MOBILE:{' '}
                                <span className="fw-bold">
                                  {contact.mobile}
                                </span>
                              </div>
                              <div className="list-group-item list-group-item-action">
                                EMAIL:{' '}
                                <span className="fw-bold">
                                  {contact.email}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-1 d-flex flex-md-column align-items-center col-sm-6 justify-content-around">
                            <Link  to={`/contacts/view/${contact.id}`}  className="btn btn-warning my-1"> 
                             <i className="fa fa-eye"></i>
                            </Link>

                            <Link to={`/contacts/edit/${contact.id}`}  className="btn btn-primary my-1">
                             <i className="fa fa-pen"></i>
                            </Link>
                            <button className="btn btn-danger" onClick={()=>{clickDelete(contact.id)}}>
                            <i className="fa fa-trash"></i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      )}
         
    </>
  );
};

export default ContactList;
