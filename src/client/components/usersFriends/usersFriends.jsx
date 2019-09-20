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
        return <button className="btn btn-primary" onClick={()=>{this.addToGroup(friend.id, this.props.selectedGroup.id)}}>Add to group</button>
    }
  }


  render() {
    let usersFriends;
    if(this.props.usersFriends.length > 0){
        usersFriends = this.props.usersFriends.map((friend, index)=>{
            return <div key={index} className="card">
                        <div className="card-body">
                            <h6 className="card-text">{friend.username}</h6>
                            {this.setButton(friend)}
                        </div>
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