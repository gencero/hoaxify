import React from "react";
import axios from "axios";

class UserSignupPage extends React.Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    pendingApiCall: false,
  };

  onChange = (event) => {
    const { name, value } = event.target;

    //const value = event.target.value
    //const name = event.target.name
    this.setState({
      [name]: value,
    });
  };

  onClickSignup = (event) => {
    event.preventDefault();

    const { username, displayName, password } = this.state;

    const body = {
      username,
      displayName,
      password,
    };

    this.setState({ pendingApiCall: true });
    axios.post("/api/1.0/users", body).then((response) => {
      this.setState({ pendingApiCall: false });
    }).catch(error => {
      this.setState({ pendingApiCall: false });
    });
  };

  render() {
    return (
      <div className="container">
        <form>
          <h1 className="text-center">Sign Up</h1>
          <div className="form-group">
            <label>Username</label>
            <input
              name="username"
              className="form-control"
              onChange={this.onChange}
            ></input>
          </div>
          <div className="form-group">
            <label>Display Name</label>
            <input
              name="displayName"
              className="form-control"
              onChange={this.onChange}
            ></input>
          </div>
          <div className="form-group">
            <label>Password </label>
            <input
              name="password"
              className="form-control"
              type="password"
              onChange={this.onChange}
            ></input>
          </div>
          <div className="form-group">
            <label>Password Repeat</label>
            <input
              name="passwordRepeat"
              className="form-control"
              type="password"
              onChange={this.onChange}
            ></input>
          </div>
          <div className="text-center">
            <button
              className="btn btn-primary"
              disabled={this.state.pendingApiCall}
              onClick={this.onClickSignup}
            >
              Sign Up
              {this.state.pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserSignupPage;
