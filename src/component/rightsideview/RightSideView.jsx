import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { VscRocket } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./style.scss";

const RightSideView = () => {
  // current person contact for conversation
  const [contact, setContact] = useState(null);

  // taking id from params
  const { id } = useParams();

  // get contact list and function to change it
  const contactList = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  // use to get current person conversation
  useEffect(() => {
    setContact(contactList.find((item) => item.id === id));
  }, [contact, contactList, id]);

  // message input value reference
  const message = useRef();

  // send message to that contact
  const sendMessage = (e) => {
    e.preventDefault();
    let newMessage = message.current.value;
    if (newMessage === "") {
      toast.warn("Write Message, please!");
      return;
    }
    let msg = {
      id: "1",
      message: newMessage,
      avatar:
        "https://images.unsplash.com/photo-1617330527074-fe659f90e7b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmFtYW58ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
      sentByUser: true,
    };
    let newList = contactList.map((contact) => {
      if (contact.id === id) {
        return {
          ...contact,
          messages: [...contact.messages, msg],
          lastMessage: newMessage,
        };
      }
      return contact;
    });
    dispatch({
      type: "CONTACT_LIST",
      payload: newList,
    });
    toast.success("successfully send message");
    message.current.value = "";
  };

  return (
    <div className="right">
      {contact ? (
        <>
          <section className="nav">
            <img src={contact.avatar} alt="profile" />
            <h2>{contact.name}</h2>
          </section>

          <section className="chats">
            {contact.messages.map((chat, i) => (
              <div
                key={`${chat.id}${i}`}
                className={chat.sentByUser ? "rightChat" : "leftChat"}
              >
                {chat.sentByUser ? (
                  <>
                    <div className="message-container">
                      <h4>{chat.message}</h4>
                    </div>
                    <img src={chat.avatar} alt="profile" />
                  </>
                ) : (
                  <>
                    <img src={chat.avatar} alt="profile" />
                    <div className="message-container">
                      <h4>{chat.message}</h4>
                    </div>
                  </>
                )}
              </div>
            ))}
          </section>

          <section className="msg">
            <form onSubmit={sendMessage} className="send">
              <input
                type="text"
                ref={message}
                placeholder="Type your message here..."
              />
              <button>
                <VscRocket />
              </button>
            </form>
          </section>
        </>
      ) : (
        <>
          <section className="nav">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/007/724/628/small/blue-chat-bubbles-on-vivid-background-conversation-concept-3d-illustration-vector.jpg"
              alt="profile"
            />
            <h2>Welcome Soumitra </h2>
          </section>

          <section className="poem">
            <h3>
              Hey, Welcome to this dummy chat section .You can also create an
              user and can send text to them.
            </h3>
            <h3>
              “Website without visitors is like a ship lost in the horizon.” ―
              Dr. Christopher Dayagdag
            </h3>
          </section>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default RightSideView;
