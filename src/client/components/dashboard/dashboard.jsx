import React from 'react';

import PropTypes from 'prop-types';

import styles from './style.scss';



class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
        inputGroupName: '',
        currentGroup: null
    };
  }
////////////////////////////////////////////////////CREATE GROUP/////////////////////////////////////////
  inputGroupName(){
    this.setState({inputGroupName: event.target.value});
  }

  createGroup(){
    console.log('creating group');
    console.log('data to input:', this.state.inputGroupName)

    var request = new XMLHttpRequest();
    var dashboardThis = this;

    request.addEventListener("load", function(){
      let responseData = JSON.parse( this.responseText );
      console.log( 'resdata::', responseData );
      if (responseData === null){
        alert('Failed to create group! Try another group name.')
      } else {
        console.log('parsed resdata:', responseData)
        console.log('create group successful')
        dashboardThis.setState({currentGroup: responseData})
      }
    });

    let data = {
        inputGroupName: this.state.inputGroupName
    };
    request.open("POST", '/groups/new');
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(data));
  }
////////////////////////////////////////////////END CREATE GROUP///////////////////////////////////////////////


  componentDidUpdate(){
    console.log('state:', this.state)
  }


  render() {
    return (
      <div className="wrapper">
        <p>{this.props.userId}</p>
        <div className="form-group" >
            <input type="text" className="form-control" placeholder="Group Name" onChange={()=>{this.inputGroupName()}} value={this.state.inputGroupName}/>
        </div>
        <button className="btn btn-primary w-50" onClick={()=>{this.createGroup()}}>Create Group</button>
      </div>
    );
  }
}

// Dashboard.propTypes = {
//   message: PropTypes.string.isRequired,
// };

export default Dashboard;