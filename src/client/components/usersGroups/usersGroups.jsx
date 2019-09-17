import React from 'react';

import styles from './style.scss';

class UsersGroups extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  selectGroup(group){
    this.props.selectGroup(group);
  }

  render() {

    let usersGroups;
    if(this.props.usersGroups.length > 0){
        usersGroups = this.props.usersGroups.map((group, index)=>{
            return <div key={index}>
                    <p>{group.groupname}</p>
                    <button onClick={()=>{this.selectGroup(group)}}>SELECT</button>
                    </div>
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