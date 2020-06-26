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
    this.setState({
      email: "",
      name: "",
      query: "",
    });
    alert("Thank You for submitting ! \nYour Response has been recorded.");
  }
  /*
  fire
      .firestore()
      .collection("WishList")
      .add(user)

  */

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div className="contact-body">
        <div class="ctop">
          <Link to="/">
            <img
              alt="ShopEasy"
              className="clogo"
              src={require("./resources/shopeasy_logo.png")}
            ></img>
          </Link>
          <Link to="http://sengroup5daiict@gmail.com/">
            <h3>sengroup5daiict@gmail.com</h3>
          </Link>
        </div>

        <div className="crest">
          <div className="cform-container">
            <h1 classname="contact-h1">Drop us a line</h1>
            <form id="contact-us-form" onSubmit={this.sendtofire}>
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
          <img src={require("./resources/test.png")} alt="" class="cill"></img>
        </div>
      </div>
    );
  }
}

export default Contact;
