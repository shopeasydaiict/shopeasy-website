import React, { Component } from "react";
import "./login.css";
import fire from "./config/fire";
import { Link } from "react-router-dom";
import Toast from "./Toast"
import checkIcon from './resources/check.svg';
import errorIcon from './resources/error.svg';
import infoIcon from './resources/info.svg';
import warningIcon from './resources/warning.svg';

class Login extends Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: "",
      password: "",
      toastList: []
    };
  }

  showToast(description,type) {
    const id = Math.floor((Math.random() * 101) + 1);
    var toastProperties = null

    var toastListTemp = this.state.toastList

    switch(type) {
      case 'success':
        toastProperties = {
          id,
          title: 'Success',
          description: description,
          backgroundColor: '#5cb85c',
          icon: checkIcon
        }
        break;
      case 'danger':
        toastProperties = {
          id,
          title: 'Danger',
          description: description,
          backgroundColor: '#d9534f',
          icon: errorIcon
        }
        break;
      case 'info':
        toastProperties = {
          id,
          title: 'Info',
          description: description,
          backgroundColor: '#5bc0de',
          icon: infoIcon
        }
        break;
      case 'warning':
        toastProperties = {
          id,
          title: 'Warning',
          description: description,
          backgroundColor: '#f0ad4e',
          icon: warningIcon
        }
        break;

        default:
          this.setState({
            toastList : []
          });
    }
    toastListTemp.push(toastProperties)

    this.setState({
      toastList : toastListTemp
    });
  }

  validatePassword(password) {
    // Do not show anything when the length of password is zero.
    if (password.length <= 7) {
      return false;
    }
    // Create an array and push all possible values that you want in password
    var matchedCase = new Array();
    matchedCase.push("[$@$!%*#?&]"); // Special Charector
    matchedCase.push("[A-Z]"); // Uppercase Alpabates
    matchedCase.push("[0-9]"); // Numbers
    matchedCase.push("[a-z]"); // Lowercase Alphabates

    // Check the conditions
    var ctr = 0;
    for (var i = 0; i < matchedCase.length; i++) {
      if (new RegExp(matchedCase[i]).test(password)) {
        ctr++;
      }
    }
    // Display it
    var strength = "";
    // eslint-disable-next-line default-case
    switch (ctr) {
      case 0:
      case 1:
      case 2:
        strength = "Very Weak";
        break;
      case 3:
        strength = "Medium";
        break;
      case 4:
        strength = "Strong";
        break;
    }
    if (strength === "Strong") return true;
    else return false;
  }

  login(e) {
    if (e) e.preventDefault();

    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        this.props.history.push("/");
        console.log(u);
      })
      .catch((err) => {
        console.log(err);
        this.showToast("Invalid Email or Password","danger");
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  signup(e) {
    e.preventDefault();
    var validate = this.validatePassword(this.state.password);
    if (validate === true) {
      fire
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((u) => {
          console.log(u);
          this.props.history.push("/");
        })
        .catch((err) => {
          console.log(err);
          this.showToast(err.message,"danger");
        });
    } else {
      alert(
        "Minimum password length required = 8 \nThe Password must contain atleast: \n- 1 Special Character \n- 1 Upper Case Alphabet \n- 1 Lower Case alphabet \n- 1 Number \n ");
    }
  }

  render() {
    return (
      <div class="lbody">
        <Link to="/" className="llogo">
          <img
            border=""
            alt="ShopEasy"
            src={require("./resources/shopeasy_logo.png")}
            style={{width:"100%"}}
          ></img>
        </Link>
        <form className="form-container">
          <h2 className="email-lable">Email address</h2>
          <input
            className="email-box"
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <h2 className="pass-lable">Password</h2>
          <input
            className="pass-box"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <button onClick={this.login} className="bt-login">
            LOGIN
          </button>
          <button onClick={this.signup} className="bt-signup">
            SIGNUP
          </button>
        </form>
        <Toast
          toastList={this.state.toastList}
          position="bottom-right"
          autoDelete={true}
      />
      </div>
    );
  }
}
export default Login;
