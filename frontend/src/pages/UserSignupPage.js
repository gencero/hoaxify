import React from "react";
import {signup} from "../api/apiCalls";
import Input from "../components/Input";

class UserSignupPage extends React.Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    pendingApiCall: false,
    errors: {}
  };

  onChange = (event) => {
    const { name, value } = event.target;
    const errors = {...this.state.errors};//object'nin kopyası olusturuldu
    errors[name] = undefined
    this.setState({
      [name]: value,
      errors
    })

    //const value = event.target.value
    //const name = event.target.name
    this.setState({
      [name]: value,
    });
  };

  onClickSignup = async (event) => {
    event.preventDefault();

    const { username, displayName, password } = this.state;

    const body = {
      username,
      displayName,
      password,
    };

    this.setState({ pendingApiCall: true });
    
    try {
       const response = await signup(body);
    } catch (error) {
      if (error.response.data.validationErrors){
        this.setState({ errors: error.response.data.validationErrors});  
      }
    }

    this.setState({ pendingApiCall: false });

    //signup(body).then((response) => {
    //  this.setState({ pendingApiCall: false });
    //}).catch(error => {
    //  this.setState({ pendingApiCall: false });
    //});
  };

  render() {
    const {pendingApiCall, errors} = this.state;
    const {username, displayName, password } = errors;

    return (
      <div className="container">
        <form>
          <h1 className="text-center">Sign Up</h1>
          <Input name="username" label= "Username" error= {username} onChange = {this.onChange} />
          <Input name="displayName" label= "Display Name" error= {displayName} onChange = {this.onChange} />
          <Input name="password" label= "Password" error= {password} onChange = {this.onChange} type="password" />
          
          <div className="form-group">
            <label>Password Repeat</label>
            <input name="passwordRepeat" className="form-control" type="password" onChange={this.onChange}></input>
          </div>
          <div className="text-center">
            <button className="btn btn-primary" disabled={pendingApiCall} onClick={this.onClickSignup}>
              Sign Up
              {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserSignupPage;
