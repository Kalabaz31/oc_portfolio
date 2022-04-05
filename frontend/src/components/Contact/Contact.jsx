import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AppWrap from "../../Wrapper/AppWrap";
import MotionWrap from "../../Wrapper/MotionWrap";

import "./Contact.scss";
import { client } from "../../client";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formDataError, setFormDataError] = useState({
    // i for initial state
    name: "i",
    email: "i",
    message: "i",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { username, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

    if (name === "name") {
      if (value.length < 1) {
        setFormDataError({
          ...formDataError,
          [name]: "Your name is required.", init: false
        });
      } else {
        setFormDataError({ ...formDataError, [name]: "", init: false });
      }
    }
    if (name === "email") {
      if (value.length === 0) {
        setFormDataError({
          ...formDataError,
          [name]: "Your email is required.", init: false
        });
      } else if (!regex.test(value)) {
        setFormDataError({
          ...formDataError,
          [name]: "The entered email is not valid.", init: false
        });
      } else {
        setFormDataError({ ...formDataError, [name]: "", init: false });
      }
    }
    if (name === "message") {
      if (value.length === 0) {
        setFormDataError({
          ...formDataError,
          [name]: "Your message is required.", init: false
        });
      } else if (value.length < 10) {
        setFormDataError({
          ...formDataError,
          [name]: "Your message requires a length of 10 characters.", init: false
        });
      } else {
        setFormDataError({ ...formDataError, [name]: "", init: false });
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    const { name, email, message } = formData;

    if (name.length === 0 || email.length === 0 || message.length === 0) {
      setFormDataError({
        name: "Your name is required.",
        email: "Your email is required.",
        message: "Your message is required.",
      });
    } else {
      setLoading(true);

      const contact = {
        _type: "contact",
        name: formData.name,
        email: formData.email,
        message: formData.message,
      };

      client
        .create(contact)
        .then(() => {
          setLoading(false);
          setIsFormSubmitted(true);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="app__contact">
      <div className="app__contact-heading">
        {console.log(formDataError)}
        <h3>
          <span></span> Connect
        </h3>

        <h1>Interested in working with me or perhaps just talk?</h1>

        <p>
          Reach me on social media, by filling out the contact form or by
          sending an email to <span> youneszahzouh@gmail.com </span>
        </p>
      </div>

      {!isFormSubmitted ? (
        <div className="app__contact-form">
          <div className="form-input">
            <label htmlFor="name">What's Your Name?</label>
            <input
              type="text"
              placeholder="Your name"
              name="name"
              required
              className={`${
                formDataError.name === "i" ? "" : 
                formDataError.name.length === 0 ? "valid" : "invalid"
              }`}
              onChange={handleChangeInput}
            />
            {formDataError.name.length > 1 && <p>{formDataError.name}</p>}
          </div>
          <div className="form-input">
            <label htmlFor="email">Your Email Address</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              className={`${
                formDataError.email === "i" ? "" : 
                formDataError.email.length === 0 ? "valid" : "invalid"
              }`}
              onChange={handleChangeInput}
            />
            {formDataError.email.length > 1 && <p>{formDataError.email}</p>}
          </div>
          <div className="form-input">
            <label htmlFor="message">Type Your Message Here</label>
            <textarea
              placeholder="Your message"
              name="message"
              maxLength="200"
              minLength="10"
              required
              className={`${
                formDataError.message === "i" ? "" : 
                formDataError.message.length === 0 ? "valid" : "invalid"
              }`}
              onChange={handleChangeInput}
            />
            <h6>{formData.message.length} / 200</h6>
            {formDataError.message.length > 1 && <p>{formDataError.message}</p>}
          </div>
          <div className="form-input">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={
                formDataError.name.length > 1 ||
                formDataError.email.length > 1 ||
                formDataError.message.length > 1
              }
            >
              {!loading ? "Send Message" : "Sending..."}
            </button>
          </div>
        </div>
      ) : (
        <h4 className="head-text">Thank you for getting in touch!</h4>
      )}
    </div>
  );
};

export default AppWrap(
  MotionWrap(Contact, "app__contact"),
  "contact",
  "app__lightbg"
);
