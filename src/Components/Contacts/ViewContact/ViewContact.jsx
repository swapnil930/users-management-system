import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../NavBar/Spinner";
import { ContactServices } from "../../../Services/Services";



const ViewContact = () => {

  let {contactId} = useParams();
  let [state,setState] = useState({
    loading:true,
    contact:{},
    errorMessage:""
  })

  useEffect(()=>{
    let promise=new Promise((res, rej)=>{
      setState((prevState)=>({...prevState, 
        loading:true,contact:{}}))

        let response=ContactServices.getContact(contactId)
        res(response)
    })
    promise.then((res1)=>{
      setState((prevState)=>({...prevState, 
        loading:false,
        contact:res1.data}))
    })
    .catch(()=>{
      setState((prevState)=>({...prevState, 
        loading:false,
        errorMessage:alert("Something Went Wrong please try again...")}))
    })
    
  },[contactId])

  let {loading,contact,errorMessage} = state;


  return (
    <>
    <div className="container text text-center">{errorMessage}</div>
      <section className="view-contact-intro">
        <div className="container p-2">
          <div className="row">
            <div className="col">
              <p className="h3 text-dark fw-bold"style={{ fontFamily: "sans-serif" }}>View Contact</p>
              <p className="" style={{fontFamily:"serif"}}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi
                nemo culpa voluptates amet atque numquam cum, quae eius impedit
                ut minima ratione, adipisci consequatur repellendus beatae
                eveniet vero animi deleniti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {loading?<Spinner/>:<React.Fragment>
    {
    contact&&Object.keys(contact).length>0 &&
        <section className="view-contact-list">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 d-flex justify-content-center">
              <img
                className="profile-pic"
                src={contact.photo}
                alt=""
              />
            </div>
          </div>
          <div className="row justify-content-center my-2">
            <div className="col-md-6 ms-2 ">
              <ul className="list-group">
                <li className="list-group-item list-group-item-action">
                  Name : <span className="fw-bold">{contact.name}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  Email : <span className="fw-bold">{contact.email}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  Contact : <span className="fw-bold">{contact.mobile}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  Company Name : <span className="fw-bold">{contact.company}</span>
                </li>
                
                <li className="list-group-item list-group-item-action">
                  Company Group : <span className="fw-bold">{contact.groupId}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-12 d-flex justify-content-center">
            <Link to={"/"} className="btn btn-danger">
              Back
            </Link>
          </div>
        </div>
      </section>
  }
</React.Fragment>}
   </>
  );
};

export default ViewContact