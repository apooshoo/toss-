import React from 'react';

import PropTypes from 'prop-types';

import styles from './style.scss';

import UsersGroups from '../usersGroups/usersGroups';
import SelectedGroup from '../selectedGroup/selectedGroup';
import UsersFriends from '../usersFriends/usersFriends';

import CreateForm from './createForm';


class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
        mode: 'main',
        usersGroups: [],
        usersFriends: [],
        inputGroupName: '',

        selectedGroup: null,
        usersInGroup: [],
    };
  }

  componentDidMount(){
    this.getUsersGroups(this.props.userId);
    this.getUsersFriends(this.props.userId);
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
      if (responseData === null){
        alert('Failed to create group! Try another group name.')
      } else {
        console.log('create group successful');
        console.log('adding this user to group');
        dashboardThis.setState({usersGroups: [...dashboardThis.state.usersGroups].concat(responseData)})//make sure the state reflects DB
        dashboardThis.addToGroup(dashboardThis.props.userId, responseData.id)//ajax yourself into the group
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
        alert('Failed to add to group!')
      } else {
        // console.log(responseData)//this is relational table info. needs added info.
        let usersInGroup = [...dashboardThis.state.usersInGroup]
        let friendToAdd = [...dashboardThis.state.usersFriends].find(friend=>{
            return friend.friendid === responseData.userid
        });
        usersInGroup.push(friendToAdd)
        dashboardThis.setState({usersInGroup: usersInGroup});
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
      if (responseData === null){
        console.log('no groups found!');
      } else {
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

///////////////////////////////////////////////GET ALL FRIENDS START////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getUsersFriends(userId){
    console.log('getting all of users friends');
    var request = new XMLHttpRequest();
    var dashboardThis = this;

    request.addEventListener("load", function(){
      let responseData = JSON.parse( this.responseText );
      if (responseData === null){
        console.log('no groups found!');
      } else {
        console.log('found groups and saving to state!')
        responseData.map(friend=>{
            dashboardThis.setState({usersFriends: [...dashboardThis.state.usersFriends.concat(friend)]});
        })
        // dashboardThis.setState({currentGroupUsers: [...this.state.currentGroupUsers].concat(responseData)})
      }
    });


    request.open("GET", `/users/${userId}/friends`);
    request.send();
  }

////////////////////////////////////////////////GET ALL FRIENDS END////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////GET ALL USERS IN GROUP START///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getGroupUsers(groupId){
    console.log('getting all of users in group');
    console.log('groupId:', groupId);

    var request = new XMLHttpRequest();
    var selectedGroupThis = this;

    request.addEventListener("load", function(){
        // console.log(this.responseText)
      let responseData = JSON.parse( this.responseText );
      // console.log('resdata:', responseData)
      if (responseData === null){
        // console.log('no users found!');
      } else {
        let usersInGroup = [];
        responseData.map(user=>{
            usersInGroup.push(user);
        })
        selectedGroupThis.setState({usersInGroup: usersInGroup});
      }
    });


    request.open("GET", `/groups/${groupId}/users`);
    request.send();
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////GET ALL USERS IN GROUP END/////////////////////////////////////////////////////////


  selectGroup(group){
    this.setState({selectedGroup: null})
    this.getGroupUsers(group.id);
    this.setState({selectedGroup: group, mode: 'showSelectedGroup'});
  }

  mainMode(){
    this.setState({selectedGroup: null, mode: 'main'});
  }



        // <button className="btn btn-primary w-50" onClick={()=>{this.addToGroup(this.props.userId, 1)}}>Add to Group</button>
//UsersGroups: list of groups user is in
  setMidCol(){
    if(this.state.mode === 'main'){
        return <CreateForm
                    inputGroupName={()=>this.inputGroupName()}
                    createGroup={()=>this.createGroup()}
                />
    } else if (this.state.mode === 'showSelectedGroup'){
        return <SelectedGroup
                    selectedGroup={this.state.selectedGroup}
                    usersInGroup={this.state.usersInGroup}
                    mainMode={()=>{this.mainMode()}}
                />
    }
  }


  render() {

        return (
          <div className="wrapper row">

            <div className="leftCol col-3">
                <UsersGroups
                    usersGroups={this.state.usersGroups}
                    selectGroup={(group)=>this.selectGroup(group)}
                />
            </div>

            <div className="midCol col-6">
                {this.setMidCol()}
            </div>

            <div className="rightCol col-3">
                <UsersFriends
                    usersFriends={this.state.usersFriends}
                    selectedGroup={this.state.selectedGroup}
                    addToGroup={(userId, groupId)=>{this.addToGroup(userId, groupId)}}
                    mode={this.state.mode}

                />
            </div>

          </div>
        );


  }
  //^^ end render
}

// Dashboard.propTypes = {
//   message: PropTypes.string.isRequired,
// };

export default Dashboard;