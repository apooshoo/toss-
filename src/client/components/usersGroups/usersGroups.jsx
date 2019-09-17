import React from 'react';

import styles from './style.scss';

class UsersGroups extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    let usersGroups;
    if(this.props.usersGroups.length > 0){
        usersGroups = this.props.usersGroups.map((group, key)=>{
            return <p>{group.groupname}</p>
        });
    };

    return (
      <div>
        {usersGroups}
      </div>
    );
  }
}

export default UsersGroups;