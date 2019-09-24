import React from 'react';
import { hot } from 'react-hot-loader';

import Dashboard from './components/dashboard/dashboard';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: null, //set to null for full app
      inputUsername: '',
      inputPassword: '',


    };
  }

  changeUsername(){
    this.setState({inputUsername: event.target.value});
  }

  changePassword(){
    this.setState({inputPassword: event.target.value});
  }

  submitLogin(){
    var request = new XMLHttpRequest();
    var appThis = this;
    request.addEventListener("load", function(){
      let responseData = JSON.parse( this.responseText );
      console.log( 'resdata::', responseData );
      if (responseData === null){
        console.log('Login failed: no resdata')
      } else {
        console.log('parsed resdata:', responseData)
        console.log('login successful')
        appThis.setState({userId: responseData.id})
      }
    });

    let data = {
        inputUsername: this.state.inputUsername,
        inputPassword: this.state.inputPassword
    };
    request.open("POST", '/users/login');
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(data));
  }

  submitRegister(){
    var request = new XMLHttpRequest();
    var appThis = this;
    request.addEventListener("load", function(){
      let responseData = JSON.parse( this.responseText );
      console.log( 'resdata::', responseData );
      if (responseData === null){
        alert('Register failed! Try another inputUsername.')
      } else {
        console.log('parsed resdata:', responseData)
        console.log('register successful')
        appThis.setState({userId: responseData.id})
      }
    });

    let data = {
        inputUsername: this.state.inputUsername,
        inputPassword: this.state.inputPassword
    };
    request.open("POST", '/users/register');
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(data));


  }

  componentDidUpdate(){
    console.log('state:', this.state)
  }

  render() {
    if(this.state.userId !== null){
        return (
          <div>
            <nav className="navbar navbar-expand-lg sticky-top d-print navbar-dark bg-dark" id="navbar">
                    <a className="navbar-brand" href="#"><img src="#" width="40" height="40" className="mr-3" alt=""/>Toss!</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
            </nav>
            <Dashboard userId={this.state.userId}/>
          </div>
        );
    } else {
        return(
            <div>
                <div className="card mx-auto start-card" style={{width: '30%', marginTop: 300}}>
                    <div className="card-body px-4 py-3">
                        <h5 className="card-title font-weight-light text-center">Toss!</h5>
                        <div className="form-group" >
                            <input type="text" className="form-control" style={{width: '50%', display:'inline-block'}} placeholder="Username" onChange={()=>{this.changeUsername()}} value={this.state.inputUsername}/>
                            <input type="password" className="form-control" style={{width: '50%', display:'inline-block'}} onChange={()=>{this.changePassword()}} placeholder="Password" value={this.state.inputPassword}/>
                        </div>
                        <button className="btn btn-primary w-50" onClick={()=>{this.submitLogin()}}>Log In</button>
                        <button className="btn btn-success w-50" onClick={()=>{this.submitRegister()}}>Register</button>
                    </div>
                    <div className="dropdown-divider"/>
                </div>
            </div>
        );
    };

  }
}
export default hot(module)(App);