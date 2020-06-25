import React, { Component } from "react";
import fire from "./config/fire";
import "./contact.css";
import { Link } from "react-router-dom";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.sendtofire = this.sendtofire.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: "",
      name: "",
      query: "",
    };
  }

  sendtofire(e) {
    e.preventDefault();
    fire
      .firestore()
      .collection("ContactForm")
      .add({
        Email: this.state.email,
        Name: this.state.name,
        Query: this.state.query,
      });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div ClassName="contact-body">
        <Link to="/">
          <img
            alt="ShopEasy"
            src={require("./resources/shopeasy_logo.png")}
            style={{ width: "6%", margin: "1%" }}
          ></img>
        </Link>
        <div className="crest">
          <div className="cform-container">
            <h1 Classname="contact-h1">Drop us a line</h1>
            <form onSubmit={this.sendtofire}>
              <label for="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                name="name"
                placeholder="Enter Name"
                onChange={this.handleChange}
                value={this.state.name}
                required
              />
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                name="email"
                placeholder="Enter Email Address"
                onChange={this.handleChange}
                value={this.state.email}
                required
              />
              <label for="query">Message</label>
              <textarea
                name="query"
                id="query"
                cols="45"
                rows="10"
                placeholder="Enter Your Query Here"
                onChange={this.handleChange}
                value={this.state.query}
                required
              ></textarea>
              <input type="submit" value="Submit" />
            </form>
          </div>
          <img
            src={require("./resources/contact_ai.png")}
            alt=""
            class="cill"
          ></img>
        </div>
      </div>
    );
  }
}

export default Contact;
