import React from 'react';

import styles from './style.scss';

class UsersFriends extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }




  render() {
    let usersFriends;
    if(this.props.usersFriends.length > 0){
        usersFriends = this.props.usersFriends.map((friend, index)=>{
            return <div key={index}>
                        <p>{friend.username}</p>
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