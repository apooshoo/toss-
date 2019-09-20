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
            return <div key={index} className="card">
                        <div className="card-body">
                            <h6 className="card-text">{group.groupname}</h6>
                            <button className="btn btn-primary" onClick={()=>{this.selectGroup(group)}}>SELECT</button>
                        </div>

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