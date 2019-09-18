import React from 'react';

import styles from './style.scss';

class SelectedGroup extends React.Component {
  constructor() {
    super();
    this.state = {
        inputEntry: '',
    };
  }

  mainMode(){
    this.props.mainMode();
  }

  componentDidMount(){
    console.log(this.props.selectedGroup.id)

  }

  inputEntry(){
    this.setState({inputEntry: event.target.value})
  }


  submitEntry(userId, groupId, entry){
    this.props.submitEntry(userId, groupId, entry);
  }

  render() {
    console.log("IN SELECTED GROUP", this.props.usersInGroup)
    let usersInGroup;
    if(this.props.usersInGroup != null){
        usersInGroup = this.props.usersInGroup.map((user, index)=>{
            return <div key={index}>
                        <p>{user.username}</p>
                        <p>Entry: {user.entry}</p>
                    </div>
        });
    };


    return (
      <React.Fragment>
        <button onClick={()=>{this.mainMode()}}>Back to main</button>
        <input value={this.state.inputEntry} onChange={()=>{this.inputEntry()}}/>
        <button onClick={()=>{this.submitEntry(this.props.userId, this.props.selectedGroup.groupid, this.state.inputEntry)}}>Submit Entry</button>
        <p>{this.props.selectedGroup.groupname}</p>
        {usersInGroup}
      </React.Fragment>
    );
  }
}

export default SelectedGroup;