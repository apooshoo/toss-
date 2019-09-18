import React from 'react';

import styles from './style.scss';

class SelectedGroup extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  mainMode(){
    this.props.mainMode();
  }

  componentDidMount(){
    console.log(this.props.selectedGroup.id)

  }


  render() {
    console.log("IN SELECTED GROUP", this.props.usersInGroup)
    let usersInGroup;
    if(this.props.usersInGroup != null){
        usersInGroup = this.props.usersInGroup.map((user, index)=>{
            return <div key={index}>
                        <p>{user.username}</p>
                    </div>
        });
    };


    return (
      <React.Fragment>
        <button onClick={()=>{this.mainMode()}}>Back to main</button>
        <p>{this.props.selectedGroup.groupname}</p>
        {usersInGroup}
      </React.Fragment>
    );
  }
}

export default SelectedGroup;