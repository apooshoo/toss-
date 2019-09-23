import React from 'react';

import PropTypes from 'prop-types';

import styles from './style.scss';

import UsersGroups from '../usersGroups/usersGroups';
import SelectedGroup from '../selectedGroup/selectedGroup';
import UsersFriends from '../usersFriends/usersFriends';
import AddFriends from '../addFriends/addFriends';
import SeePending from '../seePending/seePending';

import CreateForm from './createForm';


class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
        mode: 'main', //showSelectedGroup
        addFriendsMode: false,
        seePendingMode: false,

        allUsers: [],

        usersGroups: [],
        usersFriends: [],
        pendingSent: [],
        pendingReceived: [],

        inputGroupName: '',

        selectedGroup: null,
        usersInGroup: [],
        entry: '',
        winningEntry: '',
    };
  }

  componentDidMount(){
    this.getAllUsers();
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
            if(friend.confirmed === true){
                dashboardThis.setState({usersFriends: [...dashboardThis.state.usersFriends.concat(friend)]});
            } else if (friend.confirmed === false){
                dashboardThis.setState({pendingSent: [...dashboardThis.state.pendingSent.concat(friend)]});
            }
        });
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

////////////////////////////////////////////////SUBMIT ENTRY START//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  submitEntry(userId, groupId, entry){
    // console.log('submitting entry to group');
    // console.log('userId', userId)
    // console.log('groupId:', groupId);
    var request = new XMLHttpRequest();
    var submitEntryThis = this;

    request.addEventListener("load", function(){
        // console.log(this.responseText)
      let responseData = JSON.parse( this.responseText );
      // console.log('resdata:', responseData)
      if (responseData === null){
        // console.log('no users found!');
      } else {
        console.log('received in selectedGroup:', responseData)
        //NEED TO UPDATE STATE!!----------------------------------------------------------------
        let usersInGroup = [...submitEntryThis.state.usersInGroup];
        let userSubmitting = usersInGroup.find(user=>{
            return user.userid = userId;
        });
        userSubmitting.entry = responseData.entry;
        submitEntryThis.setState({usersInGroup: usersInGroup})
      };
    });

    let data = {
        userId: userId,
        groupId: groupId,
        entry: entry
    };
    request.open("POST", '/groups/user/entry/new');
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(data));
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////SUBMIT ENTRY END/////////////////////////////////////////////////////////





  selectGroup(group){
    this.setState({selectedGroup: null, entry: '', winningEntry: ''})
    this.getGroupUsers(group.id);
    this.setState({selectedGroup: group, mode: 'showSelectedGroup'});
  }

  inputEntry(){//in selectedGroup
    this.setState({entry: event.target.value})
  }
  setWinningEntry(entry){//in selectedGroup
    this.setState({winningEntry: entry})
  }

  mainMode(){
    this.setState({selectedGroup: null, mode: 'main', entry: '', winningEntry: ''});
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
                    userId={this.props.userId}
                    mainMode={()=>{this.mainMode()}}
                    entry={this.state.entry}
                    winningEntry={this.state.winningEntry}
                    inputEntry={()=>{this.inputEntry()}}
                    submitEntry={(userId, groupId, entry)=>{this.submitEntry(userId, groupId, entry)}}
                    setWinningEntry={(entry)=>{this.setWinningEntry(entry)}}
                />
    }
  }

////////////////////////////////////////////////////////////FRIENDS COL//////////////////////////////////////////////////
  toggleAddFriendsMode(){
    this.setState({addFriendsMode: !this.state.addFriendsMode, seePendingMode: false});
  }

  toggleSeePendingMode(){
    this.setState({seePendingMode: !this.state.seePendingMode, addFriendsMode: false});
  }

  getAllUsers(){
    console.log('getting all users');

    var request = new XMLHttpRequest();
    var dbThis = this;

    request.addEventListener("load", function(){
        // console.log(this.responseText)
      let responseData = JSON.parse( this.responseText );
      // console.log('resdata:', responseData)
      if (responseData === null){
        console.log('no users found!');
      } else {
        console.log("REZDATA for getAllUsers", responseData)
        dbThis.setState({allUsers: responseData})
        // let allUsers = [];
        // responseData.map(user=>{
        //     usersInGroup.push(user);
        // })
        // selectedGroupThis.setState({usersInGroup: usersInGroup});
      }
    });


    request.open("GET", `/users`);
    request.send();
  }

  /////////////////////////////////////////////////////ADD FRIENDS//////////////////////////////////////////////////////
  addFriend(userId, friendId){
    var request = new XMLHttpRequest();
    var dbThis = this;

    request.addEventListener("load", function(){
        // console.log(this.responseText)
      let responseData = JSON.parse( this.responseText );
      // console.log('resdata:', responseData)
      if (responseData === null){
        alert('Request already sent!')
      } else {
        console.log('REZDATA:', responseData)
        let addedId = responseData.friendid;
        let addedFriend = dbThis.state.allUsers.find(user=>{
            return user.id === addedId;
        });
        dbThis.setState({pendingSent: dbThis.state.pendingSent.concat(addedFriend)});
      };
    });

    let data = {
        userId: userId,
        friendId: friendId,
    };
    request.open("POST", '/users/friends/new');
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(data));
  }
  ///////////////////////////////////////////////////ADD FRIENDS END//////////////////////////////////////////////////

  ///////////////////////////////////////////////////////ACCEPT FRIEND///////////////////////////////////////////////

  getInvitesReceived(userId){
    //do get users friends in reverse- get all users who are pending against you
    console.log('getting all received pending invites');
    var request = new XMLHttpRequest();
    var spThis = this;

    request.addEventListener("load", function(){
      let responseData = JSON.parse( this.responseText );
      if (responseData === null){
        console.log('no groups found!');
      } else {
        console.log('got pending received invites!')
        console.log(responseData)
        let pendingReceived = responseData.filter(friend=>{
            return friend.confirmed === false;
        });
        spThis.setState({pendingReceived: pendingReceived});
      };
    });


    request.open("GET", `/users/${userId}/friends/received`);
    request.send();
  }

  acceptInvite(userSentFromId, userReceivingId){// will confirm sender's request and send back a confirmed request too
    var request = new XMLHttpRequest();
    var dbThis = this;

    request.addEventListener("load", function(){
        // console.log(this.responseText)
      let responseData = JSON.parse( this.responseText );
      // console.log('resdata:', responseData)
      if (responseData === null){
        alert('Request already sent!')
      } else {
        console.log('REZDATA from acceptInvite:', responseData)
        let filteredAddedFriend = [...dbThis.state.pendingReceived].filter(user=>{
            return user.userid != responseData.confirmed.userid;
        });
        dbThis.setState({pendingReceived: filteredAddedFriend});
        // let addedId = responseData.friendid;
        // let addedFriend = dbThis.state.allUsers.find(user=>{
        //     return user.id === addedId;
        // });
        // dbThis.setState({pendingSent: dbThis.state.pendingSent.concat(addedFriend)});
      };
    });

    let data = {
        userId: userSentFromId,
        friendId: userReceivingId
    };
    request.open("POST", '/users/friends/confirm');
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(data));
  }
// confirmBack: {id: 11, userid: 4, friendid: 1, winbalance: 0, confirmed: true}
// confirmed: {id: 10, userid: 1, friendid: 4, winbalance: 0, confirmed: true}

  ///////////////////////////////////////////////////////ACCEPT FRIEND END////////////////////////////////////////////

/////////////////////////////////////////////////////////////CANCEL OR DELETE FRIEND////////////////////////////////////////
  deleteFriend(userId, friendId){
    var request = new XMLHttpRequest();
    var dbThis = this;

    request.addEventListener("load", function(){
        // console.log(this.responseText)
      let responseData = JSON.parse( this.responseText );
      // console.log('resdata:', responseData)
      if (responseData === null){
        alert('Request already sent!')
      } else {
        console.log('DELETED:', responseData)
        let pendingSent = [...dbThis.state.pendingSent].filter(friend=>{
            return friend.userid != responseData.userid;
        });
        dbThis.setState({pendingSent: pendingSent});
      };
    });

    let data = {
        userId: userId,
        friendId: friendId,
    };
    request.open("POST", '/users/friends/delete');
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(data));
  }

/////////////////////////////////////////////////////////////CANCEL OR DELETE FRIEND END////////////////////////////////////////





  setFriendsCol(){
    if(this.state.addFriendsMode === false && this.state.seePendingMode === false){
        return <React.Fragment>
                    <button className="btn btn-primary" onClick={()=>{this.toggleAddFriendsMode()}}>Add a Friend</button>
                    <button className="btn btn-info" onClick={()=>{this.toggleSeePendingMode()}}>See Pending</button>
                    <UsersFriends
                        usersFriends={this.state.usersFriends}
                        selectedGroup={this.state.selectedGroup}
                        addToGroup={(userId, groupId)=>{this.addToGroup(userId, groupId)}}
                        mode={this.state.mode}
                    />
                </React.Fragment>
    } else if (this.state.addFriendsMode === true && this.state.seePendingMode === false){
        return <React.Fragment>
                    <button className="btn btn-primary" onClick={()=>{this.toggleAddFriendsMode()}}>See Friends</button>
                    <button className="btn btn-info" onClick={()=>{this.toggleSeePendingMode()}}>See Pending</button>
                    <AddFriends
                        allUsers={this.state.allUsers}
                        userId={this.props.userId}
                        addFriend={(userId, friendId)=>{this.addFriend(userId, friendId)}}
                    />
                </React.Fragment>
    } else if (this.state.seePendingMode === true){
        return <React.Fragment>
                    <button className="btn btn-primary" onClick={()=>{this.toggleAddFriendsMode()}}>See Friends</button>
                    <button className="btn btn-primary" onClick={()=>{this.toggleAddFriendsMode()}}>Add a Friend</button>
                    <SeePending
                        userId={this.props.userId}
                        allUsers={this.state.allUsers}
                        getInvitesReceived={(userId)=>{this.getInvitesReceived(userId)}}
                        acceptInvite={(userSentFromId, userReceivingId)=>{this.acceptInvite(userSentFromId, userReceivingId)}}
                        deleteFriend={(userId, friendId)=>{this.deleteFriend(userId, friendId)}}
                        pendingSent={this.state.pendingSent}
                        pendingReceived={this.state.pendingReceived}
                    />
                </React.Fragment>
    }
  }
////////////////////////////////////////////////////////FRIENDS COL END//////////////////////////////////////////////////////


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
                {this.setFriendsCol()}
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