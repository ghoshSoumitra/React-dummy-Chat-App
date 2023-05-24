import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./style.scss";

const LeftSidebar = () => {
  // search contact
  const [search, setSearch] = useState("");
  // adding contact form open || closed
  const [openConversation, setOpenConversation] = useState(false);

  // store
  const contactList = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  // searched contact
  const filteredContactList = contactList.filter((contact) => {
    return contact.name.toLowerCase().includes(search.toLowerCase());
  });

  // refereing contact details
  const contact = useRef();
  const image = useRef();

  // add new contact to list
  const addContact = (e) => {
    e.preventDefault();
    let n = contactList.length + 2;
    let id = `${n}`;
    let name = contact.current.value;
    let avatar = image.current.value;
    if (name === "" && avatar === "") {
      setOpenConversation(false);
      toast.warning("Please enter a name and avatar");
      return;
    }
    const newContact = {
      id: id,
      name: name,
      avatar: avatar,
      messages: [],
    };
    contactList.push(newContact);
    dispatch({
      type: "CONTACT_LIST",
      payload: contactList,
    });
    contact.current.value = "";
    image.current.value = "";
    setOpenConversation(false);
    toast.success("Contact Added");
  };

  return (
    <section className="left">
      <div className="fixed">
        <Link to="/" className="user">
          <img
            src="https://scontent.frdp1-1.fna.fbcdn.net/v/t31.18172-8/24313412_727020817504410_4945962027499434399_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=19026a&_nc_ohc=QdXKWUBWRikAX_7vOg-&_nc_ht=scontent.frdp1-1.fna&oh=00_AfBjqKEMVo8iMgr6oRJ3-WkPitB_fpJOxkgtLoOMi49j4g&oe=64956B80"
            alt="user"
          />
          <h2>Soumitra</h2>
        </Link>
        <div className="searchbox">
          <input
            type="search"
            className="searchInput"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
            placeholder="Search for conversation"
          />
        </div>
        <div>
          {openConversation ? (
            <>
              <div className="addCon">
                <p>Add CONVERSATIONS</p>
              </div>
              <form onSubmit={addContact} className="search">
                <input type="text" ref={contact} placeholder="Enter your name" className="addinput" />
                <input type="url" ref={image} placeholder="Enter your DP url" className="addinput" />
                <button className="addbtn">+ Add</button>
              </form>
            </>
          ) : (
            <div className="addCon">
              <p> New CONVERSATIONS</p>
              <button onClick={() => setOpenConversation(true)}>+</button>
            </div>
          )}
        </div>
      </div>

      <div className="contactList">
        {filteredContactList &&
          filteredContactList.map((item, index) => {
            return (
              <Link
                key={index}
                to={`/chat/${item.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="contact">
                  <img src={item.avatar} alt="" />
                  <div className="contactText">
                    <p className="name">{item.name}</p>
                    {item.lastMessage && <p>{item.lastMessage}</p>}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
      <ToastContainer/>
    </section>
  );
};

export default LeftSidebar;
