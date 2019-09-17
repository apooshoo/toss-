import React from 'react';

import PropTypes from 'prop-types';

import styles from './style.scss';

import UsersGroups from '../usersGroups/usersGroups';



class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
        usersGroups: [],
        inputGroupName: '',
        currentGroup: null,
        // currentGroupUsers: []

    };
  }

  componentDidMount(){
    this.getUsersGroups(this.props.userId);
  }

  componentDidUpdate(){
    console.log('state:', this.state)
  }

////////////////////////////////////////////////////CREATE GROUP START/////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        console.log('parsed resdata:', responseData);
        console.log('create group successful');
        dashboardThis.setState({currentGroup: responseData});
        console.log('adding this user to group');
        dashboardThis.addToGroup(dashboardThis.props.userId, responseData.id)
      }
    });

    let data = {
        inputGroupName: this.state.inputGroupName
    };
    request.open("POST", '/groups/new');
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(data));
  }
////////////////////////////////////////////////CREATE GROUP END///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////INSERT INTO GROUP START/////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  addToGroup(userId, groupId){
    console.log('adding to group');
    console.log('userId', userId);
    console.log('groupId', groupId)

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
        // dashboardThis.setState({currentGroupUsers: [...this.state.currentGroupUsers].concat(responseData)})
      }
    });

    let data = {
        userId: userId,
        groupId: groupId
    };
    request.open("POST", '/groups/user/new');
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(data));

  }

////////////////////////////////////////////////////INSERT INTO GROUP END//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////GET USERS GROUPS//////////////////////////////////////////////
  getUsersGroups(userId){
    console.log('getting all of users groups');
    console.log('userId:', userId);

    var request = new XMLHttpRequest();
    var dashboardThis = this;

    request.addEventListener("load", function(){
      let responseData = JSON.parse( this.responseText );
      console.log( 'resdata::', responseData );
      if (responseData === null){
        console.log('no groups found!');
      } else {
        console.log('parsed resdata:', responseData)
        console.log('found groups and saving to state!')
        responseData.map(group=>{
            dashboardThis.setState({usersGroups: [...dashboardThis.state.usersGroups.concat(group)]});
        })
        // dashboardThis.setState({currentGroupUsers: [...this.state.currentGroupUsers].concat(responseData)})
      }
    });


    request.open("GET", `/users/${userId}/groups`);
    request.send();
  }



////////////////////////////////////////////////END GET USERS GROUPS/////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////





        // <button className="btn btn-primary w-50" onClick={()=>{this.addToGroup(this.props.userId, 1)}}>Add to Group</button>

  render() {

    return (
      <div className="wrapper">
        <div className="form-group" >
            <input type="text" className="form-control" placeholder="Group Name" onChange={()=>{this.inputGroupName()}} value={this.state.inputGroupName}/>
        </div>
        <button className="btn btn-primary w-50" onClick={()=>{this.createGroup()}}>Create Group</button>


        <UsersGroups usersGroups={this.state.usersGroups}/>

      </div>
    );
  }
}

// Dashboard.propTypes = {
//   message: PropTypes.string.isRequired,
// };

export default Dashboard;