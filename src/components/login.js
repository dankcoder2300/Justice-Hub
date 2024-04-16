import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { BACKEND_URL } from "../data";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      type: "",
      password: "",
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  createItem() {
    localStorage.setItem("mytime", Date.now());
  }

  readValue() {
    var x = localStorage.getItem("mytime");
    document.getElementById("demo").innerHTML = x;
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }
  onSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        username: this.state.username,
        password: this.state.password,
        type: this.state.type,
      };

      const resp = await axios.post(`${BACKEND_URL}/users/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(resp)
      window.location = "/caseList";
      alert("Login successful");

      localStorage.setItem("type", user.type);
      localStorage.setItem("username", "exists");
      // localStorage.setItem("Type" , )

      this.setState({
        username: "",
        password: "",
        type: "",
      });

      console.log(localStorage.getItem("registrar"));
    } catch (err) {
      console.log(err);
      alert("Something went wrong ! check console");
    }
  };
  render() {
    return (
      <div className="login-container">
        <div className="container">
          <div className="screen">
            <div className="screen__content">
              <h2 className="heading">Login User</h2>
              <form className="login" onSubmit={this.onSubmit}>
                <div className="login__field">
                  <select
                    class="form-select"
                    id="role-select"
                    aria-label="Default select example"
                    onChange={this.onChangeType}
                    value={this.state.type}
                    required
                  >
                    {/* <option selected>Open this select menu</option> */}
                    <option value="Lawyer">Lawyer</option>
                    <option value="Registrar">Registrar</option>
                    <option value="Judge">Judge</option>
                  </select>
                </div>

                <div className="login__field">
                  <i className="login__icon fas fa-user"></i>
                  <input
                    type="text"
                    className="login__input"
                    placeholder="User name / Email"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                  />
                </div>
                <div className="login__field">
                  <i className="login__icon fas fa-lock"></i>
                  <input
                    type="password"
                    className="login__input"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                  />
                </div>
                <button
                  className="button login__submit"
                  type="submit"
                  value="Login"
                >
                  <span className="button__text">Log In Now</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
              </form>
            </div>
            <div className="screen__background">
              <span className="screen__background__shape screen__background__shape4"></span>
              <span className="screen__background__shape screen__background__shape3"></span>
              <span className="screen__background__shape screen__background__shape2"></span>
              <span className="screen__background__shape screen__background__shape1"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
