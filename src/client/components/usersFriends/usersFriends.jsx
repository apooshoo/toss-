import React from 'react';

import styles from './style.scss';

class UsersFriends extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  addToGroup(userId, groupId){
    this.props.addToGroup(userId, groupId);
  }

  setButton(friend){
    if (this.props.mode === 'main'){
        return <p>btn to create group with friend</p>
    } else if(this.props.mode === 'showSelectedGroup'){
        return <button onClick={()=>{this.addToGroup(friend.id, this.props.selectedGroup.id)}}>Add to group</button>
    }
  }


  render() {
    let usersFriends;
    if(this.props.usersFriends.length > 0){
        usersFriends = this.props.usersFriends.map((friend, index)=>{
            return <div key={index}>
                        <p>{friend.username}</p>
                        {this.setButton(friend)}
                    </div>
        });
    };


    return (
      <div>
        {usersFriends}
      </div>
    );
  }
}

export default UsersFriends;